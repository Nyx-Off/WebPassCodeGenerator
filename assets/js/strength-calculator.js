// Password Strength Calculator Module
class StrengthCalculator {
    constructor() {
        // Common passwords list (simplified for demo)
        this.commonPasswords = [
            'password', '123456', '12345678', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ];
        
        // Common patterns
        this.patterns = {
            repeating: /(.)\1{2,}/,
            sequential: /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i,
            keyboard: /(?:qwerty|asdf|zxcv|qazwsx|qweasd)/i
        };
    }
    
    calculate(password, options) {
        if (!password || password.length === 0) {
            return {
                score: 0,
                strength: 'none',
                feedback: [],
                crackTime: 'instant'
            };
        }
        
        let score = 0;
        let feedback = [];
        
        // Length
        score += this.calculateLengthScore(password.length);
        
        // Character variety
        score += this.calculateVarietyScore(password);
        
        // Patterns and common passwords
        const patternPenalty = this.calculatePatternPenalty(password);
        score -= patternPenalty.penalty;
        feedback = feedback.concat(patternPenalty.feedback);
        
        // Entropy calculation
        const entropy = this.calculateEntropy(password, options);
        
        // Calculate crack time
        const crackTime = this.estimateCrackTime(entropy);
        
        // Determine strength level
        const strength = this.getStrengthLevel(score, entropy);
        
        return {
            score: Math.max(0, Math.min(100, score)),
            strength: strength,
            feedback: feedback,
            crackTime: crackTime,
            entropy: entropy
        };
    }
    
    calculateLengthScore(length) {
        if (length < 6) return 0;
        if (length < 8) return 10;
        if (length < 10) return 20;
        if (length < 12) return 30;
        if (length < 14) return 40;
        if (length < 16) return 50;
        return Math.min(60, 50 + (length - 16) * 2);
    }
    
    calculateVarietyScore(password) {
        let score = 0;
        const checks = {
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            numbers: /[0-9]/,
            symbols: /[^a-zA-Z0-9]/
        };
        
        let typesUsed = 0;
        for (let check in checks) {
            if (checks[check].test(password)) {
                typesUsed++;
            }
        }
        
        score = typesUsed * 10;
        
        // Bonus for using all types
        if (typesUsed === 4) {
            score += 10;
        }
        
        return score;
    }
    
    calculatePatternPenalty(password) {
        let penalty = 0;
        let feedback = [];
        
        // Check for common passwords
        if (this.commonPasswords.includes(password.toLowerCase())) {
            penalty += 50;
            feedback.push('This is a commonly used password');
        }
        
        // Check for repeating characters
        if (this.patterns.repeating.test(password)) {
            penalty += 20;
            feedback.push('Avoid repeating characters');
        }
        
        // Check for sequential characters
        if (this.patterns.sequential.test(password)) {
            penalty += 15;
            feedback.push('Avoid sequential characters');
        }
        
        // Check for keyboard patterns
        if (this.patterns.keyboard.test(password)) {
            penalty += 15;
            feedback.push('Avoid keyboard patterns');
        }
        
        // Check if password is all numbers
        if (/^\d+$/.test(password)) {
            penalty += 20;
            feedback.push('Don\'t use only numbers');
        }
        
        // Check if password is all letters
        if (/^[a-zA-Z]+$/.test(password)) {
            penalty += 15;
            feedback.push('Include numbers or symbols');
        }
        
        return { penalty, feedback };
    }
    
    calculateEntropy(password, options) {
        let charsetSize = 0;
        
        // Determine actual charset size based on password content
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Common symbols
        
        const entropy = password.length * Math.log2(charsetSize);
        return entropy;
    }
    
    estimateCrackTime(entropy) {
        // Assuming 1 trillion guesses per second (modern GPU cluster)
        const guessesPerSecond = 1e12;
        const totalCombinations = Math.pow(2, entropy);
        const secondsToCrack = totalCombinations / (2 * guessesPerSecond); // Average case
        
        return this.formatTime(secondsToCrack);
    }
    
    formatTime(seconds) {
        if (seconds < 1) return 'instant';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
        if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
        
        const years = seconds / 31536000;
        if (years < 1000) return `${Math.round(years)} years`;
        if (years < 1000000) return `${Math.round(years / 1000)}k years`;
        if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
        if (years < 1000000000000) return `${Math.round(years / 1000000000)} billion years`;
        return 'centuries';
    }
    
    getStrengthLevel(score, entropy) {
        if (entropy < 28 || score < 30) return 'weak';
        if (entropy < 36 || score < 50) return 'fair';
        if (entropy < 60 || score < 70) return 'good';
        return 'strong';
    }
}