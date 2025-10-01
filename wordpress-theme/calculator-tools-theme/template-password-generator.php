<?php
/**
 * Template Name: Password Generator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">🔐 Password Generator</h1>
            <p class="ct-tool-description">Generate secure random passwords with custom options</p>

            <div class="ct-form-group">
                <label class="ct-label">Password Length: <span id="lengthDisplay">16</span></label>
                <input type="range" id="passwordLength" class="ct-slider" min="4" max="64" value="16" oninput="updateLengthDisplay()">
            </div>

            <div class="ct-form-group">
                <label class="ct-label">
                    <input type="checkbox" id="includeUppercase" checked> Include Uppercase (A-Z)
                </label>
            </div>

            <div class="ct-form-group">
                <label class="ct-label">
                    <input type="checkbox" id="includeLowercase" checked> Include Lowercase (a-z)
                </label>
            </div>

            <div class="ct-form-group">
                <label class="ct-label">
                    <input type="checkbox" id="includeNumbers" checked> Include Numbers (0-9)
                </label>
            </div>

            <div class="ct-form-group">
                <label class="ct-label">
                    <input type="checkbox" id="includeSymbols" checked> Include Symbols (!@#$%...)
                </label>
            </div>

            <button onclick="generatePassword()" class="ct-btn ct-btn-primary">Generate Password</button>

            <div id="passwordResult" class="ct-results" style="display: none; margin-top: 1.5rem;">
                <div class="ct-form-group">
                    <label class="ct-label">Generated Password:</label>
                    <input type="text" id="generatedPassword" class="ct-input" readonly>
                </div>
                <button onclick="copyPassword()" class="ct-btn ct-btn-secondary" id="copyBtn">Copy Password</button>
            </div>
        </div>
    </div>
</main>

<script>
function updateLengthDisplay() {
    document.getElementById('lengthDisplay').textContent = document.getElementById('passwordLength').value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character type');
        return;
    }
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('generatedPassword').value = password;
    document.getElementById('passwordResult').style.display = 'block';
}

function copyPassword() {
    const password = document.getElementById('generatedPassword').value;
    navigator.clipboard.writeText(password).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Generate password on page load
generatePassword();
</script>

<?php get_footer(); ?>
