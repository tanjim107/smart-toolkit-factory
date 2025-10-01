<?php
/**
 * Template Name: QR Code Generator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📱 QR Code Generator</h1>
            <p class="ct-tool-description">Generate QR codes for text, URLs, and more</p>

            <div class="ct-form-group">
                <label class="ct-label">Enter Text or URL:</label>
                <textarea id="qrText" class="ct-textarea" placeholder="Enter text or URL to encode..." rows="4"></textarea>
            </div>

            <div class="ct-form-group">
                <label class="ct-label">QR Code Size:</label>
                <select id="qrSize" class="ct-select">
                    <option value="128">Small (128x128)</option>
                    <option value="256" selected>Medium (256x256)</option>
                    <option value="512">Large (512x512)</option>
                </select>
            </div>

            <button onclick="generateQR()" class="ct-btn ct-btn-primary">Generate QR Code</button>

            <div id="qrResult" style="display: none; margin-top: 2rem; text-align: center;">
                <div id="qrcode" style="display: inline-block; padding: 1rem; background: white; border-radius: 0.5rem;"></div>
                <div style="margin-top: 1rem;">
                    <button onclick="downloadQR()" class="ct-btn ct-btn-secondary">Download QR Code</button>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
let qrcode = null;

function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    const size = parseInt(document.getElementById('qrSize').value);
    
    if (!text) {
        alert('Please enter text or URL');
        return;
    }
    
    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';
    
    // Generate new QR code
    qrcode = new QRCode(document.getElementById('qrcode'), {
        text: text,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    document.getElementById('qrResult').style.display = 'block';
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = url;
        link.click();
    }
}
</script>

<?php get_footer(); ?>
