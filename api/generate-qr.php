<?php
/**
 * QR Code Generator API
 * Generates QR codes for passwords
 */

require_once '../includes/config.php';

// Set CORS headers
setCorsHeaders();

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['password']) || empty($input['password'])) {
    jsonResponse(['error' => 'Password is required'], 400);
}

$password = $input['password'];

// Limit password length for QR code
if (strlen($password) > 1000) {
    jsonResponse(['error' => 'Password too long for QR code'], 400);
}

// Method 1: Try to use phpqrcode if available
if (file_exists('lib/phpqrcode/qrlib.php')) {
    require_once 'lib/phpqrcode/qrlib.php';
    
    try {
        // Create temp directory
        $tempDir = '../temp/';
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }
        
        $fileName = 'qr_' . uniqid() . '.png';
        $filePath = $tempDir . $fileName;
        
        // Generate QR code with high error correction
        QRcode::png($password, $filePath, QR_ECLEVEL_H, 10, 2);
        
        if (file_exists($filePath)) {
            $qrData = base64_encode(file_get_contents($filePath));
            unlink($filePath); // Clean up
            
            jsonResponse([
                'success' => true,
                'qrCode' => 'data:image/png;base64,' . $qrData
            ]);
        }
    } catch (Exception $e) {
        // Fall through to next method
    }
}

// Method 2: Use Google Charts API as fallback
try {
    $qr_size = 300;
    $qr_url = 'https://chart.googleapis.com/chart?'
        . 'cht=qr'
        . '&chs=' . $qr_size . 'x' . $qr_size
        . '&chld=H|0'
        . '&chl=' . urlencode($password);
    
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'header' => 'User-Agent: PHP'
        ]
    ]);
    
    $qr_image = @file_get_contents($qr_url, false, $context);
    
    if ($qr_image) {
        jsonResponse([
            'success' => true,
            'qrCode' => 'data:image/png;base64,' . base64_encode($qr_image)
        ]);
    }
} catch (Exception $e) {
    // Fall through to next method
}

// Method 3: Create a visual pattern using GD (not a real QR code)
if (extension_loaded('gd')) {
    $size = 300;
    $modules = 25;
    $module_size = floor($size / $modules);
    
    // Create image
    $image = imagecreatetruecolor($size, $size);
    $white = imagecolorallocate($image, 255, 255, 255);
    $purple = imagecolorallocate($image, 155, 89, 182);
    
    // Fill white background
    imagefilledrectangle($image, 0, 0, $size, $size, $white);
    
    // Generate pattern based on password hash
    $hash = hash('sha256', $password);
    
    for ($y = 0; $y < $modules; $y++) {
        for ($x = 0; $x < $modules; $x++) {
            $byte_index = floor(($y * $modules + $x) / 4);
            $bit_index = ($y * $modules + $x) % 4;
            
            if ($byte_index < strlen($hash)) {
                $byte = hexdec($hash[$byte_index]);
                if (($byte >> $bit_index) & 1) {
                    imagefilledrectangle(
                        $image,
                        $x * $module_size,
                        $y * $module_size,
                        ($x + 1) * $module_size - 1,
                        ($y + 1) * $module_size - 1,
                        $purple
                    );
                }
            }
        }
    }
    
    // Add corner markers (fake QR code style)
    $marker_size = 7 * $module_size;
    imagefilledrectangle($image, 0, 0, $marker_size, $marker_size, $purple);
    imagefilledrectangle($image, $size - $marker_size, 0, $size, $marker_size, $purple);
    imagefilledrectangle($image, 0, $size - $marker_size, $marker_size, $size, $purple);
    
    // Add white centers to markers
    $inner_size = 3 * $module_size;
    $inner_offset = 2 * $module_size;
    imagefilledrectangle($image, $inner_offset, $inner_offset, $inner_offset + $inner_size, $inner_offset + $inner_size, $white);
    imagefilledrectangle($image, $size - $marker_size + $inner_offset, $inner_offset, $size - $marker_size + $inner_offset + $inner_size, $inner_offset + $inner_size, $white);
    imagefilledrectangle($image, $inner_offset, $size - $marker_size + $inner_offset, $inner_offset + $inner_size, $size - $marker_size + $inner_offset + $inner_size, $white);
    
    // Output as base64
    ob_start();
    imagepng($image);
    $imageData = ob_get_clean();
    imagedestroy($image);
    
    jsonResponse([
        'success' => true,
        'qrCode' => 'data:image/png;base64,' . base64_encode($imageData),
        'warning' => 'Visual pattern generated (not scannable). Install phpqrcode for real QR codes.'
    ]);
}

// No method worked
jsonResponse([
    'error' => 'Unable to generate QR code. Please check server configuration.',
    'help' => 'Install phpqrcode library or enable GD extension'
], 500);
?>