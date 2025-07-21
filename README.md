# 🔐 WebPassCodeGenerator

<div align="center">

![WebPassCodeGenerator](https://img.shields.io/badge/WebPassCodeGenerator-v1.0.0-9b59b6?style=for-the-badge&logo=shield&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Security](https://img.shields.io/badge/Security-A+-brightgreen?style=for-the-badge&logo=security&logoColor=white)

<img src="https://raw.githubusercontent.com/yourusername/WebPassCodeGenerator/main/assets/demo.gif" alt="WebPassCodeGenerator Demo" width="600">

**A cyberpunk-themed password generator with real-time strength analysis and QR code generation**

[Live Demo](https://yourdemo.com) • [Report Bug](https://github.com/yourusername/WebPassCodeGenerator/issues) • [Request Feature](https://github.com/yourusername/WebPassCodeGenerator/issues)

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎲 **Secure Generation** | Cryptographically secure password generation using Web Crypto API |
| 📊 **Strength Analysis** | Real-time password strength calculation with crack time estimation |
| 📱 **QR Code Generation** | Instant QR code generation for easy password sharing |
| 🎨 **Mr. Robot Theme** | Cyberpunk aesthetic with glitch effects and matrix rain |
| 💾 **Local Storage** | Password history saved locally (never sent to server) |
| ⚡ **100% Client-Side** | All password generation happens in your browser |

</div>

## 🚀 Quick Start

### Prerequisites

- PHP 7.4+ (optional, only for QR code API)
- Web server (Apache/Nginx)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WebPassCodeGenerator.git
   cd WebPassCodeGenerator
   ```

2. **Set up web server**
   
   Point your web server to the project directory or use PHP's built-in server:
   ```bash
   php -S localhost:8000
   ```

3. **Install dependencies (optional)**
   
   For server-side QR code generation:
   ```bash
   php install.php
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

That's it! 🎉 The password generator works completely client-side.

## 🛠️ Configuration

### Password Options

- **Length**: 4-128 characters
- **Character Sets**:
  - Lowercase letters (a-z)
  - Uppercase letters (A-Z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)
- **Advanced Options**:
  - Exclude ambiguous characters (0O, 1l, I)
  - Start with a letter
  - Exclude specific characters

### Strength Indicators

| Strength | Entropy | Color | Example Crack Time |
|----------|---------|-------|-------------------|
| 🔴 Weak | < 28 bits | Red | Instant - Minutes |
| 🟡 Fair | 28-36 bits | Orange | Hours - Days |
| 🟣 Good | 36-60 bits | Purple | Months - Years |
| 🟢 Strong | > 60 bits | Green | Centuries+ |

## 📁 Project Structure

```
WebPassCodeGenerator/
├── 📄 index.html           # Main application file
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── main.css       # Core styles
│   │   ├── animations.css # Cyberpunk animations
│   │   └── components.css # UI components
│   └── 📁 js/
│       ├── app.js              # Main application logic
│       ├── password-generator.js # Password generation engine
│       ├── strength-calculator.js # Strength analysis
│       └── ui-controller.js     # UI management
├── 📁 api/
│   └── generate-qr.php    # QR code generation API
├── 📁 includes/
│   └── config.php         # PHP configuration
└── 📄 install.php         # Dependency installer
```

## 🔧 Technical Details

### Security Features

- ✅ **Cryptographically Secure**: Uses `crypto.getRandomValues()`
- ✅ **No Server Storage**: Passwords never leave your browser
- ✅ **CSP Headers**: Content Security Policy enabled
- ✅ **XSS Protection**: Input sanitization and output encoding
- ✅ **HTTPS Ready**: Secure headers configured

### Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 53+ |
| Safari | 11+ |
| Edge | 79+ |

### Performance

- ⚡ **Instant Generation**: < 1ms for 128-character passwords
- 📦 **Lightweight**: ~50KB total (excluding fonts)
- 🎯 **Zero Dependencies**: Pure JavaScript (except QR library)

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
    --color-accent: #9b59b6;        /* Purple */
    --color-accent-dark: #6c3483;   /* Dark purple */
    --color-accent-light: #bb8fce;  /* Light purple */
}
```

### Add Custom Character Sets

Modify `assets/js/password-generator.js`:

```javascript
this.charsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    // Add your custom set:
    custom: 'àéèêëùüöôñç'
};
```

## 📸 Screenshots

<div align="center">
<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/yourusername/WebPassCodeGenerator/main/assets/screenshots/main.png" width="400">
      <br>
      <em>Main Interface</em>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/yourusername/WebPassCodeGenerator/main/assets/screenshots/qrcode.png" width="400">
      <br>
      <em>QR Code Generation</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/yourusername/WebPassCodeGenerator/main/assets/screenshots/strength.png" width="400">
      <br>
      <em>Strength Analysis</em>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/yourusername/WebPassCodeGenerator/main/assets/screenshots/history.png" width="400">
      <br>
      <em>Password History</em>
    </td>
  </tr>
</table>
</div>

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## 👤 Author

**Samy - Nyx**

- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/WebPassCodeGenerator](https://github.com/yourusername/WebPassCodeGenerator)

## 🙏 Acknowledgments

- [Mr. Robot](https://www.usanetwork.com/mr-robot) for the aesthetic inspiration
- [qrcode.js](https://davidshimjs.github.io/qrcodejs/) for QR code generation
- [Font Awesome](https://fontawesome.com) for icons
- [Google Fonts](https://fonts.google.com) for typography

## 📊 Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/WebPassCodeGenerator?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/WebPassCodeGenerator?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/WebPassCodeGenerator?style=social)

</div>

---

<div align="center">
Made with 💜 and ☕ by Samy - Nyx

**[⬆ back to top](#-webpasscodegenerator)**
</div>
