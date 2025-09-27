<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container password-generator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Generate secure passwords with customizable options</p>
    </div>
    
    <!-- Password Display -->
    <div class="password-display" style="font-family: 'Courier New', monospace; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 18px; word-break: break-all; position: relative; margin-bottom: 15px;">
        <span id="generated-password">Click generate to create password</span>
        <button type="button" class="copy-btn" data-text="" style="position: absolute; top: 10px; right: 10px; background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">Copy</button>
    </div>
    
    <!-- Password Strength Indicator -->
    <div class="password-strength" style="margin-bottom: 20px;">
        <div class="password-strength-bar weak" style="height: 4px; border-radius: 2px; background: #ef4444; margin-bottom: 5px;"></div>
        <span class="password-strength-label" style="font-size: 12px; font-weight: 500;">WEAK</span>
    </div>
    
    <!-- Password Options -->
    <div class="password-options">
        <div class="calc-form-group" style="margin-bottom: 20px;">
            <label class="calc-form-label">Password Length: <span class="password-length-display">12 characters</span></label>
            <input type="range" class="password-length-slider" min="4" max="50" value="12" style="width: 100%; margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-top: 4px;">
                <span>4</span>
                <span>50</span>
            </div>
        </div>
        
        <div class="calc-grid calc-grid-2" style="gap: 15px; margin-bottom: 20px;">
            <div class="calc-switch">
                <label class="calc-form-label">Include Uppercase (A-Z)</label>
                <input type="checkbox" class="include-uppercase password-options" checked>
            </div>
            
            <div class="calc-switch">
                <label class="calc-form-label">Include Lowercase (a-z)</label>
                <input type="checkbox" class="include-lowercase password-options" checked>
            </div>
            
            <div class="calc-switch">
                <label class="calc-form-label">Include Numbers (0-9)</label>
                <input type="checkbox" class="include-numbers password-options" checked>
            </div>
            
            <div class="calc-switch">
                <label class="calc-form-label">Include Symbols (!@#$)</label>
                <input type="checkbox" class="include-symbols password-options" checked>
            </div>
        </div>
        
        <button type="button" class="generate-password-btn calc-btn calc-btn-primary" style="width: 100%; margin-bottom: 20px;">Generate New Password</button>
    </div>
    
    <!-- Security Tips -->
    <div class="calc-info" style="padding: 15px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #0369a1;">Password Security Tips:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #0f172a; line-height: 1.6;">
            <li>Use a different password for each account</li>
            <li>Aim for at least 12 characters for better security</li>
            <li>Include a mix of characters, numbers, and symbols</li>
            <li>Consider using a password manager to store your passwords</li>
            <li>Never share your passwords or write them down</li>
        </ul>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.password-generator-container');
    if (!container) return;
    
    const passwordDisplay = container.querySelector('#generated-password');
    const copyBtn = container.querySelector('.copy-btn');
    const lengthSlider = container.querySelector('.password-length-slider');
    const lengthDisplay = container.querySelector('.password-length-display');
    const generateBtn = container.querySelector('.generate-password-btn');
    const strengthBar = container.querySelector('.password-strength-bar');
    const strengthLabel = container.querySelector('.password-strength-label');
    
    // Generate initial password
    generatePassword();
    
    // Event listeners
    lengthSlider.addEventListener('input', function() {
        lengthDisplay.textContent = this.value + ' characters';
        generatePassword();
    });
    
    container.querySelectorAll('.password-options').forEach(function(checkbox) {
        checkbox.addEventListener('change', generatePassword);
    });
    
    generateBtn.addEventListener('click', generatePassword);
    
    copyBtn.addEventListener('click', function() {
        const password = passwordDisplay.textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(password).then(function() {
                showCopySuccess();
            });
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showCopySuccess();
        }
    });
    
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const uppercase = container.querySelector('.include-uppercase').checked;
        const lowercase = container.querySelector('.include-lowercase').checked;
        const numbers = container.querySelector('.include-numbers').checked;
        const symbols = container.querySelector('.include-symbols').checked;
        
        let charset = '';
        if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';
        
        if (charset === '') {
            charset = 'abcdefghijklmnopqrstuvwxyz';
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        passwordDisplay.textContent = password;
        copyBtn.setAttribute('data-text', password);
        evaluatePasswordStrength(password);
    }
    
    function evaluatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        const uniqueChars = new Set(password.split('')).size;
        if (uniqueChars > password.length * 0.6) score++;
        
        let strength = 'weak';
        let strengthText = 'WEAK';
        let color = '#ef4444';
        
        if (score >= 7) {
            strength = 'very-strong';
            strengthText = 'VERY STRONG';
            color = '#059669';
        } else if (score >= 5) {
            strength = 'strong';
            strengthText = 'STRONG';
            color = '#10b981';
        } else if (score >= 3) {
            strength = 'moderate';
            strengthText = 'MODERATE';
            color = '#f59e0b';
        }
        
        strengthBar.className = 'password-strength-bar ' + strength;
        strengthBar.style.background = color;
        strengthLabel.textContent = strengthText;
    }
    
    function showCopySuccess() {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '#3b82f6';
        }, 2000);
    }
});
</script>