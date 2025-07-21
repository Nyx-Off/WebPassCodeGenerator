// Password Generator Module
class PasswordGenerator {
    constructor() {
        this.charsets = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        this.ambiguousChars = '0O1lI';
    }
    
    generate(options) {
        // Validate options
        if (!this.validateOptions(options)) {
            throw new Error('Invalid password generation options');
        }
        
        // Build character set
        let charset = this.buildCharset(options);
        
        // Remove excluded characters
        if (options.excludeChars) {
            charset = this.removeExcludedChars(charset, options.excludeChars);
        }
        
        // Remove ambiguous characters if requested
        if (options.noAmbiguous) {
            charset = this.removeAmbiguousChars(charset);
        }
        
        // Check if charset is empty
        if (charset.length === 0) {
            throw new Error('No characters available for password generation');
        }
        
        // Generate password
        let password = this.generatePassword(charset, options.length);
        
        // Ensure password begins with letter if requested
        if (options.beginLetter) {
            password = this.ensureBeginWithLetter(password, options);
        }
        
        // Ensure password contains at least one character from each selected set
        if (options.ensureEachType) {
            password = this.ensureCharacterTypes(password, options);
        }
        
        return password;
    }
    
    validateOptions(options) {
        // Check if at least one character type is selected
        if (!options.lowercase && !options.uppercase && 
            !options.numbers && !options.symbols) {
            return false;
        }
        
        // Check if length is valid
        if (options.length < 4 || options.length > 128) {
            return false;
        }
        
        return true;
    }
    
    buildCharset(options) {
        let charset = '';
        
        if (options.lowercase) charset += this.charsets.lowercase;
        if (options.uppercase) charset += this.charsets.uppercase;
        if (options.numbers) charset += this.charsets.numbers;
        if (options.symbols) charset += this.charsets.symbols;
        
        return charset;
    }
    
    removeExcludedChars(charset, excludeChars) {
        let result = '';
        for (let char of charset) {
            if (!excludeChars.includes(char)) {
                result += char;
            }
        }
        return result;
    }
    
    removeAmbiguousChars(charset) {
        let result = '';
        for (let char of charset) {
            if (!this.ambiguousChars.includes(char)) {
                result += char;
            }
        }
        return result;
    }
    
    generatePassword(charset, length) {
        let password = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }
        
        return password;
    }
    
    ensureBeginWithLetter(password, options) {
        let letters = '';
        if (options.lowercase) letters += this.charsets.lowercase;
        if (options.uppercase) letters += this.charsets.uppercase;
        
        if (letters.length === 0) return password;
        
        // Check if password already begins with letter
        if (letters.includes(password[0])) return password;
        
        // Replace first character with random letter
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const randomLetter = letters[array[0] % letters.length];
        
        return randomLetter + password.slice(1);
    }
    
    ensureCharacterTypes(password, options) {
        let passwordArray = password.split('');
        let requiredSets = [];
        
        // Check which character types are missing
        if (options.lowercase && !this.containsCharFrom(password, this.charsets.lowercase)) {
            requiredSets.push(this.charsets.lowercase);
        }
        if (options.uppercase && !this.containsCharFrom(password, this.charsets.uppercase)) {
            requiredSets.push(this.charsets.uppercase);
        }
        if (options.numbers && !this.containsCharFrom(password, this.charsets.numbers)) {
            requiredSets.push(this.charsets.numbers);
        }
        if (options.symbols && !this.containsCharFrom(password, this.charsets.symbols)) {
            requiredSets.push(this.charsets.symbols);
        }
        
        // Add missing character types
        const array = new Uint32Array(requiredSets.length * 2);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < requiredSets.length; i++) {
            const charset = requiredSets[i];
            const charIndex = array[i * 2] % charset.length;
            const posIndex = array[i * 2 + 1] % passwordArray.length;
            
            passwordArray[posIndex] = charset[charIndex];
        }
        
        return passwordArray.join('');
    }
    
    containsCharFrom(str, charset) {
        for (let char of str) {
            if (charset.includes(char)) return true;
        }
        return false;
    }
    
    // Calculate entropy
    calculateEntropy(password, options) {
        let charsetSize = 0;
        
        if (options.lowercase) charsetSize += 26;
        if (options.uppercase) charsetSize += 26;
        if (options.numbers) charsetSize += 10;
        if (options.symbols) charsetSize += this.charsets.symbols.length;
        
        // Adjust for excluded characters
        if (options.excludeChars) {
            charsetSize -= options.excludeChars.length;
        }
        
        // Adjust for ambiguous characters
        if (options.noAmbiguous) {
            let ambiguousCount = 0;
            if (options.lowercase || options.uppercase) ambiguousCount += 4; // O, o, I, l
            if (options.numbers) ambiguousCount += 2; // 0, 1
            charsetSize -= ambiguousCount;
        }
        
        const entropy = password.length * Math.log2(charsetSize);
        return entropy;
    }
}