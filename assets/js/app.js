// Main Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules
    const passwordGenerator = new PasswordGenerator();
    const strengthCalculator = new StrengthCalculator();
    const uiController = new UIController();
    
    // Initialize UI
    uiController.init();
    
    // Boot sequence
    runBootSequence();
    
    // Matrix rain effect
    initMatrixRain();
    
    // Generate button handler
    document.getElementById('generateBtn').addEventListener('click', generatePassword);
    
    // Generate initial password
    setTimeout(() => {
        generatePassword();
    }, 2000);
    
    function generatePassword() {
        try {
            // Get options
            const options = {
                length: parseInt(document.getElementById('lengthNumber').value),
                lowercase: document.getElementById('lowercase').checked,
                uppercase: document.getElementById('uppercase').checked,
                numbers: document.getElementById('numbers').checked,
                symbols: document.getElementById('symbols').checked,
                excludeChars: document.getElementById('excludeChars').value,
                noAmbiguous: document.getElementById('noAmbiguous').checked,
                beginLetter: document.getElementById('beginLetter').checked,
                ensureEachType: true
            };
            
            // Generate password
            const password = passwordGenerator.generate(options);
            
            // Calculate strength
            const strengthResult = strengthCalculator.calculate(password, options);
            
            // Update UI
            uiController.displayPassword(password);
            uiController.updateStrengthIndicator(strengthResult);
            
        } catch (error) {
            uiController.showError(error.message);
        }
    }
    
    function runBootSequence() {
        const bootSequence = document.getElementById('bootSequence');
        const bootText = document.getElementById('bootText');
        
        const bootMessages = [
            'INITIALIZING SYSTEM...',
            'LOADING KERNEL MODULES...',
            'CHECKING ENTROPY SOURCES... [OK]',
            'INITIALIZING RANDOM NUMBER GENERATOR... [OK]',
            'LOADING CRYPTOGRAPHIC LIBRARIES... [OK]',
            'MOUNTING SECURE FILESYSTEM... [OK]',
            'STARTING PASSWORD GENERATOR SERVICE...',
            'SYSTEM READY.',
            ''
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let currentText = '';
        
        function typeMessage() {
            if (messageIndex >= bootMessages.length) {
                setTimeout(() => {
                    bootSequence.classList.add('hidden');
                }, 500);
                return;
            }
            
            const currentMessage = bootMessages[messageIndex];
            
            if (charIndex < currentMessage.length) {
                currentText += currentMessage[charIndex];
                bootText.textContent = currentText + '_';
                charIndex++;
                setTimeout(typeMessage, 20);
            } else {
                currentText += '\n';
                bootText.textContent = currentText;
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 200);
            }
        }
        
        setTimeout(typeMessage, 500);
    }
    
    function initMatrixRain() {
        const canvas = document.getElementById('matrixRain');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Matrix characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|;:<>?,./"';
        const charArray = chars.split('');
        
        // Font size
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        // Drops array
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
        
        // Draw function
        function draw() {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set text properties
            ctx.fillStyle = '#9b59b6';
            ctx.font = fontSize + 'px monospace';
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                ctx.fillText(text, x, y);
                
                // Reset drop when it reaches bottom
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Animation loop
        setInterval(draw, 35);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + G to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            e.preventDefault();
            generatePassword();
        }
        
        // Ctrl/Cmd + C to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && uiController.currentPassword) {
            e.preventDefault();
            uiController.copyPassword();
        }
    });
});