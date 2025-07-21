// UI Controller Module
class UIController {
    constructor() {
        this.elements = {
            passwordDisplay: document.getElementById('passwordDisplay'),
            copyBtn: document.getElementById('copyBtn'),
            strengthBar: document.getElementById('strengthBar'),
            strengthText: document.getElementById('strengthText'),
            crackTime: document.getElementById('crackTime'),
            lengthRange: document.getElementById('lengthRange'),
            lengthNumber: document.getElementById('lengthNumber'),
            generateBtn: document.getElementById('generateBtn'),
            qrContainer: document.getElementById('qrContainer'),
            downloadQrBtn: document.getElementById('downloadQrBtn'),
            historyList: document.getElementById('historyList'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn')
        };
        
        this.qrCode = null;
        this.currentPassword = '';
        this.history = this.loadHistory();
    }
    
    init() {
        this.bindEvents();
        this.updateHistoryDisplay();
    }
    
    bindEvents() {
        // Length slider sync
        this.elements.lengthRange.addEventListener('input', (e) => {
            this.elements.lengthNumber.value = e.target.value;
        });
        
        this.elements.lengthNumber.addEventListener('input', (e) => {
            this.elements.lengthRange.value = e.target.value;
        });
        
        // Copy button
        this.elements.copyBtn.addEventListener('click', () => {
            this.copyPassword();
        });
        
        // Download QR button
        this.elements.downloadQrBtn.addEventListener('click', () => {
            this.downloadQR();
        });
        
        // Clear history button
        this.elements.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });
    }
    
    displayPassword(password) {
        this.currentPassword = password;
        this.elements.passwordDisplay.textContent = password;
        this.elements.passwordDisplay.classList.remove('placeholder');
        
        // Add to history
        this.addToHistory(password);
        
        // Generate QR code
        this.generateQRCode(password);
        
        // Enable buttons
        this.elements.copyBtn.disabled = false;
        this.elements.downloadQrBtn.disabled = false;
    }
    
    updateStrengthIndicator(result) {
        // Update strength bar
        const percentage = result.score;
        this.elements.strengthBar.style.width = `${percentage}%`;
        
        // Remove all strength classes
        this.elements.strengthBar.classList.remove('weak', 'fair', 'good', 'strong');
        
        // Add appropriate class
        this.elements.strengthBar.classList.add(result.strength);
        
        // Update text
        this.elements.strengthText.textContent = `STRENGTH: ${result.strength.toUpperCase()}`;
        this.elements.crackTime.textContent = `CRACK TIME: ${result.crackTime}`;
        
        // Show feedback if any
        if (result.feedback.length > 0) {
            this.showToast(result.feedback[0], 'warning');
        }
    }
    
    copyPassword() {
        if (!this.currentPassword) return;
        
        navigator.clipboard.writeText(this.currentPassword).then(() => {
            this.elements.copyBtn.classList.add('copied');
            this.elements.copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            this.showToast('Password copied to clipboard!', 'success');
            
            setTimeout(() => {
                this.elements.copyBtn.classList.remove('copied');
                this.elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        }).catch(err => {
            this.showToast('Failed to copy password', 'error');
        });
    }
    
    generateQRCode(password) {
        // Clear existing QR code
        this.elements.qrContainer.innerHTML = '';
        
        // Create QR code
        this.qrCode = new QRCode(this.elements.qrContainer, {
            text: password,
            width: 256,
            height: 256,
            colorDark: '#9b59b6',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    downloadQR() {
        if (!this.qrCode) return;
        
        const canvas = this.elements.qrContainer.querySelector('canvas');
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = `password-qr-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showToast('QR code downloaded!', 'success');
    }
    
    addToHistory(password) {
        const historyItem = {
            password: password,
            timestamp: Date.now(),
            strength: this.elements.strengthText.textContent.replace('STRENGTH: ', '')
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 10 passwords
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        
        this.saveHistory();
        this.updateHistoryDisplay();
    }
    
    updateHistoryDisplay() {
        if (this.history.length === 0) {
            this.elements.historyList.innerHTML = `
                <div class="history-empty">
                    <i class="fas fa-history"></i>
                    <p>NO HISTORY AVAILABLE</p>
                </div>
            `;
            return;
        }
        
        this.elements.historyList.innerHTML = this.history.map(item => `
            <div class="history-item">
                <div class="history-password">${this.maskPassword(item.password)}</div>
                <div class="history-meta">
                    <span>${this.formatDate(item.timestamp)}</span>
                    <span>${item.strength}</span>
                </div>
            </div>
        `).join('');
    }
    
    maskPassword(password) {
        if (password.length <= 8) {
            return password;
        }
        const start = password.slice(0, 4);
        const end = password.slice(-4);
        const masked = '*'.repeat(password.length - 8);
        return `${start}${masked}${end}`;
    }
    
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }
    
    clearHistory() {
        if (confirm('Are you sure you want to clear password history?')) {
            this.history = [];
            this.saveHistory();
            this.updateHistoryDisplay();
            this.showToast('History cleared', 'success');
        }
    }
    
    saveHistory() {
        try {
            localStorage.setItem('passwordHistory', JSON.stringify(this.history));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('passwordHistory');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load history:', e);
            return [];
        }
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type} show`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    showError(message) {
        this.showToast(message, 'error');
        this.elements.generateBtn.classList.add('shake');
        setTimeout(() => {
            this.elements.generateBtn.classList.remove('shake');
        }, 500);
    }
}