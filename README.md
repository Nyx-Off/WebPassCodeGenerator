# 🔐 WebPassCodeGenerator

<div align="center">

![WebPassCodeGenerator](https://img.shields.io/badge/WebPassCodeGenerator-v1.0.0-9b59b6?style=for-the-badge&logo=shield&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<img src="https://raw.githubusercontent.com/Nyx-Off/WebPassCodeGenerator/main/assets/demo.gif" alt="WebPassCodeGenerator Demo" width="600">

**🎭 A cyberpunk-themed password generator with real-time strength analysis and QR code generation**

**100% Client-Side • No Installation Required • Works Offline**

[Live Demo](https://nyx-off.github.io/WebPassCodeGenerator) • [Report Bug](https://github.com/Nyx-Off/WebPassCodeGenerator/issues) • [Request Feature](https://github.com/Nyx-Off/WebPassCodeGenerator/issues)

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎲 **Secure Generation** | Cryptographically secure passwords using Web Crypto API |
| 📊 **Real-time Analysis** | Instant strength calculation with crack time estimation |
| 📱 **QR Code Generation** | Instant QR codes for easy password sharing |
| 🎨 **Mr. Robot Theme** | Cyberpunk aesthetic with glitch effects and matrix rain |
| 💾 **Local History** | Last 10 passwords saved locally (never sent to server) |
| ⚡ **100% Client-Side** | Everything runs in your browser - no server needed |
| 🔒 **Privacy First** | No data collection, no analytics, no external requests |
| 📱 **Responsive Design** | Works perfectly on desktop, tablet, and mobile |

</div>

## 🚀 Quick Start

### Option 1: Use Online (Easiest)
Visit the live demo: [https://nyx-off.github.io/WebPassCodeGenerator](https://nyx-off.github.io/WebPassCodeGenerator)

### Option 2: Download & Run Locally
```bash
# Clone the repository
git clone https://github.com/Nyx-Off/WebPassCodeGenerator.git

# Open in browser
cd WebPassCodeGenerator
open index.html  # macOS
# OR
start index.html # Windows
# OR
xdg-open index.html # Linux
```

### Option 3: Host on Web Server
```bash
# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js (http-server)
npx http-server
```

**That's it!** 🎉 No dependencies to install, no build process, just open and use.

## 🛠️ Password Options

### Length Control
- **Range**: 4-128 characters
- **Default**: 16 characters
- Real-time slider with numeric input sync

### Character Sets
- ✅ **Lowercase**: `a-z` (26 characters)
- ✅ **Uppercase**: `A-Z` (26 characters)
- ✅ **Numbers**: `0-9` (10 characters)
- ✅ **Symbols**: `!@#$%^&*()_+-=[]{}|;:,.<>?` (28 characters)

### Advanced Options
- 🚫 **Exclude Ambiguous**: Remove `0O, 1l, I`
- 🔤 **Begin with Letter**: Force first character to be alphabetic
- ❌ **Exclude Custom**: Remove any specific characters

### Strength Indicators

| Strength | Score | Entropy | Crack Time | Color |
|----------|-------|---------|------------|-------|
| 🔴 **Weak** | < 30 | < 28 bits | Instant - Hours | Red |
| 🟡 **Fair** | 30-50 | 28-36 bits | Days - Months | Orange |
| 🟣 **Good** | 50-70 | 36-60 bits | Years - Centuries | Purple |
| 🟢 **Strong** | > 70 | > 60 bits | Millennia+ | Green |

## 📁 Project Structure

```
WebPassCodeGenerator/
├── 📄 index.html              # Main application
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── main.css          # Core styles & variables
│   │   ├── animations.css    # Glitch, matrix rain, effects
│   │   └── components.css    # UI components
│   └── 📁 js/
│       ├── app.js            # Main application controller
│       ├── password-generator.js  # Crypto generation engine
│       ├── strength-calculator.js # Strength & entropy analysis
│       └── ui-controller.js      # UI state management
├── 📄 LICENSE                # MIT License
└── 📄 README.md             # This file
```

### Optional Files (Not Required)
- `api/` - PHP backend (QR codes work without this)
- `includes/` - PHP config (not needed)
- `install.php` - Installer (not needed)
- `.htaccess` - Apache config (optional)

## 🔧 Technical Details

### Security Features
- ✅ **Cryptographically Secure**: Uses `crypto.getRandomValues()`
- ✅ **No Network Requests**: 100% offline capable
- ✅ **No External Dependencies**: Pure vanilla JavaScript
- ✅ **Memory Safe**: Passwords cleared from memory after use
- ✅ **XSS Protected**: All inputs sanitized

### Browser Compatibility

| Browser | Minimum Version | Tested |
|---------|----------------|---------|
| Chrome | 60+ | ✅ |
| Firefox | 53+ | ✅ |
| Safari | 11+ | ✅ |
| Edge | 79+ | ✅ |
| Opera | 47+ | ✅ |

### Performance Metrics
- ⚡ **Initial Load**: < 100ms
- ⚡ **Password Generation**: < 1ms
- ⚡ **QR Generation**: < 50ms
- 📦 **Total Size**: ~50KB (excluding fonts)
- 🎯 **Lighthouse Score**: 100/100

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
    --color-accent: #9b59b6;        /* Main purple */
    --color-accent-dark: #6c3483;   /* Dark purple */
    --color-accent-light: #bb8fce;  /* Light purple */
    --color-success: #27ae60;       /* Green */
    --color-warning: #f39c12;       /* Orange */
    --color-danger: #e74c3c;        /* Red */
}
```

### Modify Character Sets

Edit `assets/js/password-generator.js`:

```javascript
this.charsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    // Add custom sets:
    custom: 'àéèêëñç'  // Example: accented characters
};
```

### Adjust Animation Speed

Edit timing in `assets/css/animations.css`:

```css
/* Glitch effect speed */
.glitch { animation: glitch 1s infinite; }

/* Matrix rain speed */
setInterval(draw, 35); // in app.js
```

## 💻 Keyboard Shortcuts

| Shortcut | Action |
|----------|---------|
| `Ctrl/Cmd + G` | Generate new password |
| `Ctrl/Cmd + C` | Copy current password |

## 🎯 Use Cases

- **Personal Security**: Generate strong passwords for personal accounts
- **Development**: Create secure API keys and tokens
- **System Administration**: Generate root passwords and service accounts
- **Team Sharing**: QR codes for secure password distribution
- **Offline Environments**: Works without internet connection

## 🤝 Contributing

Contributions make the open source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Keep it client-side only
- Maintain the cyberpunk aesthetic
- Ensure mobile responsiveness
- Write clean, commented code
- Test across browsers

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## 👤 Author

**Samy - Nyx**

- 🌐 Website: [bensalemdev.fr](https://bensalemdev.fr)
- 💼 GitHub: [@Nyx-Off](https://github.com/Nyx-Off)
- 📧 Contact: [GitHub Issues](https://github.com/Nyx-Off/WebPassCodeGenerator/issues)

## 🙏 Acknowledgments

- [Mr. Robot](https://www.usanetwork.com/mr-robot) - Design inspiration
- [qrcode.js](https://davidshimjs.github.io/qrcodejs/) - QR code generation
- [Font Awesome](https://fontawesome.com) - Icons
- [Google Fonts](https://fonts.google.com) - Typography
- The open source community 💜

## 📊 Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Nyx-Off/WebPassCodeGenerator?style=social)
![GitHub forks](https://img.shields.io/github/forks/Nyx-Off/WebPassCodeGenerator?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Nyx-Off/WebPassCodeGenerator?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/Nyx-Off/WebPassCodeGenerator?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/Nyx-Off/WebPassCodeGenerator?style=flat-square)

</div>

## 🔒 Security

- **No Data Collection**: We don't track, store, or transmit any data
- **Local Storage Only**: History saved in browser's localStorage
- **Open Source**: Audit the code yourself
- **Report Security Issues**: [Create a private security advisory](https://github.com/Nyx-Off/WebPassCodeGenerator/security/advisories/new)

## 🚀 Roadmap

- [ ] PWA support for offline mobile use
- [ ] Browser extension version
- [ ] Additional themes (Matrix, Tron, Blade Runner)
- [ ] Password strength tips
- [ ] Passphrase generation mode
- [ ] Export/Import password history
- [ ] Multi-language support

---

<div align="center">
<h3>🎭 Stay Safe, Stay Secure 🎭</h3>

Made with 💜 and ☕ by Samy - Nyx

**If you like this project, please ⭐ star it!**

<br>

**[⬆ back to top](#-webpasscodegenerator)**
</div>
