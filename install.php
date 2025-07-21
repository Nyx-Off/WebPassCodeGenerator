<?php
/**
 * Installation script for QR Code library
 * Run this file once to download and install phpqrcode
 */

echo "Password Generator - Installation Script\n";
echo "======================================\n\n";

// Check if running from command line
$is_cli = (php_sapi_name() === 'cli');
if (!$is_cli) {
    echo "<pre>";
}

// Create directories if they don't exist
$directories = ['api/lib', 'temp'];
foreach ($directories as $dir) {
    if (!file_exists($dir)) {
        if (mkdir($dir, 0755, true)) {
            echo "✓ Created directory: $dir\n";
        } else {
            echo "✗ Failed to create directory: $dir\n";
        }
    } else {
        echo "✓ Directory already exists: $dir\n";
    }
}

// Download phpqrcode library
echo "\nDownloading phpqrcode library...\n";
$qrcode_url = 'https://sourceforge.net/projects/phpqrcode/files/releases/phpqrcode-2010100721_1.1.4.zip/download';
$zip_file = 'api/lib/phpqrcode.zip';

// Download the file
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $qrcode_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
$data = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 200 && $data) {
    file_put_contents($zip_file, $data);
    echo "✓ Downloaded phpqrcode library\n";
    
    // Extract the zip file
    $zip = new ZipArchive;
    if ($zip->open($zip_file) === TRUE) {
        $zip->extractTo('api/lib/');
        $zip->close();
        echo "✓ Extracted phpqrcode library\n";
        
        // Remove zip file
        unlink($zip_file);
        echo "✓ Cleaned up temporary files\n";
    } else {
        echo "✗ Failed to extract zip file\n";
    }
} else {
    echo "✗ Failed to download phpqrcode library (HTTP $http_code)\n";
    echo "You can manually download it from:\n";
    echo "http://phpqrcode.sourceforge.net/\n";
}

// Create .htaccess for security
$htaccess_content = "# Deny access to PHP files
<FilesMatch \"\\.php$\">
    Order Deny,Allow
    Deny from all
</FilesMatch>

# Allow access to generate-qr.php
<Files \"generate-qr.php\">
    Order Allow,Deny
    Allow from all
</Files>

# Protect directories
Options -Indexes";

file_put_contents('api/.htaccess', $htaccess_content);
echo "\n✓ Created security .htaccess file\n";

// Check PHP extensions
echo "\nChecking PHP extensions:\n";
$required_extensions = ['gd', 'curl', 'json'];
foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "✓ $ext extension is installed\n";
    } else {
        echo "✗ $ext extension is NOT installed (required for full functionality)\n";
    }
}

echo "\n======================================\n";
echo "Installation complete!\n";

if (!$is_cli) {
    echo "</pre>";
}
?>