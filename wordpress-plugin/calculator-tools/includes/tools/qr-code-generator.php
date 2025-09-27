<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container qr-code-generator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Create custom QR codes for text, URLs, emails, and phone numbers</p>
    </div>
    
    <div class="calc-tabs">
        <div class="calc-tabs-list">
            <button class="calc-tab-trigger active" data-target="text">Text</button>
            <button class="calc-tab-trigger" data-target="url">URL</button>
            <button class="calc-tab-trigger" data-target="email">Email</button>
            <button class="calc-tab-trigger" data-target="phone">Phone</button>
        </div>
        
        <!-- Text QR Code -->
        <div class="calc-tab-content active" data-tab="text">
            <div class="calc-form-group">
                <label class="calc-form-label">Enter Text</label>
                <textarea class="qr-text-input calc-form-textarea" placeholder="Enter any text to generate QR code" rows="4"></textarea>
            </div>
        </div>
        
        <!-- URL QR Code -->
        <div class="calc-tab-content" data-tab="url">
            <div class="calc-form-group">
                <label class="calc-form-label">Enter URL</label>
                <input type="url" class="qr-text-input calc-form-input" placeholder="https://example.com">
            </div>
        </div>
        
        <!-- Email QR Code -->
        <div class="calc-tab-content" data-tab="email">
            <div class="calc-grid calc-grid-2">
                <div class="calc-form-group">
                    <label class="calc-form-label">Email Address</label>
                    <input type="email" class="qr-email-address calc-form-input" placeholder="user@example.com">
                </div>
                <div class="calc-form-group">
                    <label class="calc-form-label">Subject (Optional)</label>
                    <input type="text" class="qr-email-subject calc-form-input" placeholder="Email subject">
                </div>
            </div>
            <div class="calc-form-group">
                <label class="calc-form-label">Message (Optional)</label>
                <textarea class="qr-email-body calc-form-textarea" placeholder="Email message" rows="3"></textarea>
            </div>
        </div>
        
        <!-- Phone QR Code -->
        <div class="calc-tab-content" data-tab="phone">
            <div class="calc-form-group">
                <label class="calc-form-label">Phone Number</label>
                <input type="tel" class="qr-text-input calc-form-input" placeholder="+1234567890">
                <small style="color: #666; font-size: 12px;">Include country code for international numbers</small>
            </div>
        </div>
    </div>
    
    <!-- QR Code Options -->
    <div class="qr-options" style="margin-top: 20px;">
        <div class="calc-grid calc-grid-2">
            <div class="calc-form-group">
                <label class="calc-form-label">QR Code Size</label>
                <select class="qr-size-select calc-form-select">
                    <option value="150">150x150 px (Small)</option>
                    <option value="200" selected>200x200 px (Medium)</option>
                    <option value="300">300x300 px (Large)</option>
                    <option value="400">400x400 px (Extra Large)</option>
                </select>
            </div>
            <div class="calc-form-group">
                <label class="calc-form-label">Error Correction</label>
                <select class="qr-error-correction calc-form-select">
                    <option value="L">Low (7%)</option>
                    <option value="M" selected>Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                </select>
            </div>
        </div>
        
        <button type="button" class="generate-qr-btn calc-btn calc-btn-primary" style="width: 100%; margin-top: 15px;">Generate QR Code</button>
    </div>
    
    <!-- QR Code Display -->
    <div class="qr-code-display" style="margin-top: 20px; text-align: center;"></div>
    
    <div class="calc-info" style="margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #0369a1;">QR Code Tips:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #0f172a; line-height: 1.6;">
            <li>Higher error correction allows the QR code to work even if partially damaged</li>
            <li>Larger QR codes are easier to scan from a distance</li>
            <li>Test your QR code with different scanning apps before printing</li>
            <li>Ensure good contrast when printing (dark QR code on light background)</li>
        </ul>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.qr-code-generator-container');
    if (!container) return;
    
    const generateBtn = container.querySelector('.generate-qr-btn');
    const qrDisplay = container.querySelector('.qr-code-display');
    const sizeSelect = container.querySelector('.qr-size-select');
    const errorCorrectionSelect = container.querySelector('.qr-error-correction');
    
    // Event listeners
    generateBtn.addEventListener('click', generateQRCode);
    
    // Auto-generate on input change for text
    container.addEventListener('input', function(e) {
        if (e.target.classList.contains('qr-text-input')) {
            debounce(generateQRCode, 500)();
        }
    });
    
    function generateQRCode() {
        const activeTab = container.querySelector('.calc-tab-trigger.active').getAttribute('data-target');
        let qrText = '';
        
        switch(activeTab) {
            case 'text':
                qrText = container.querySelector('.calc-tab-content.active .qr-text-input').value;
                break;
                
            case 'url':
                qrText = container.querySelector('.calc-tab-content.active .qr-text-input').value;
                if (qrText && !qrText.startsWith('http://') && !qrText.startsWith('https://')) {
                    qrText = 'https://' + qrText;
                }
                break;
                
            case 'email':
                const email = container.querySelector('.qr-email-address').value;
                const subject = container.querySelector('.qr-email-subject').value;
                const body = container.querySelector('.qr-email-body').value;
                
                if (email) {
                    qrText = 'mailto:' + email;
                    const params = [];
                    if (subject) params.push('subject=' + encodeURIComponent(subject));
                    if (body) params.push('body=' + encodeURIComponent(body));
                    if (params.length > 0) {
                        qrText += '?' + params.join('&');
                    }
                }
                break;
                
            case 'phone':
                const phone = container.querySelector('.calc-tab-content.active .qr-text-input').value;
                if (phone) {
                    qrText = 'tel:' + phone;
                }
                break;
        }
        
        if (!qrText.trim()) {
            qrDisplay.innerHTML = '<div class="calc-error">Please enter content to generate QR code</div>';
            return;
        }
        
        const size = sizeSelect.value;
        const errorCorrection = errorCorrectionSelect.value;
        const encodedText = encodeURIComponent(qrText);
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&ecc=${errorCorrection}&data=${encodedText}`;
        
        qrDisplay.innerHTML = `
            <div class="qr-code-container">
                <img src="${qrUrl}" alt="Generated QR Code" class="qr-code-image" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="margin-top: 15px;">
                    <a href="${qrUrl}" download="qrcode.png" class="calc-btn calc-btn-primary" style="margin-right: 10px;">Download PNG</a>
                    <button type="button" onclick="window.open('${qrUrl}', '_blank')" class="calc-btn calc-btn-secondary">Open in New Tab</button>
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #666;">
                    Content: ${qrText.length > 50 ? qrText.substring(0, 50) + '...' : qrText}
                </div>
            </div>
        `;
    }
    
    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle email tab special inputs
    container.querySelectorAll('.qr-email-address, .qr-email-subject, .qr-email-body').forEach(function(input) {
        input.addEventListener('input', debounce(generateQRCode, 500));
    });
});
</script>