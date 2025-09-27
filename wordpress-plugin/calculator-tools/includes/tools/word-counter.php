<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container word-counter-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Count words, characters, sentences, and paragraphs in your text</p>
    </div>
    
    <div class="calc-form-group">
        <label class="calc-form-label">Enter your text below:</label>
        <textarea class="word-counter-textarea calc-form-textarea" placeholder="Start typing or paste your text here..." rows="8"></textarea>
    </div>
    
    <div class="calc-grid calc-grid-2" style="margin-top: 15px;">
        <button type="button" class="clear-text-btn calc-btn calc-btn-secondary">Clear Text</button>
        <button type="button" class="copy-btn calc-btn calc-btn-secondary" data-text="">Copy Text</button>
    </div>
    
    <div class="word-stats" style="display: none; margin-top: 20px;">
        <div class="calc-result">
            <div class="calc-result-title">Text Statistics</div>
            <div class="calc-result-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Words</div>
                    <div class="calc-result-item-value word-count">0</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Characters</div>
                    <div class="calc-result-item-value character-count">0</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Characters (no spaces)</div>
                    <div class="calc-result-item-value character-count-no-spaces">0</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Sentences</div>
                    <div class="calc-result-item-value sentence-count">0</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Paragraphs</div>
                    <div class="calc-result-item-value paragraph-count">0</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Lines</div>
                    <div class="calc-result-item-value line-count">1</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Reading Time</div>
                    <div class="calc-result-item-value"><span class="reading-time">0</span> min</div>
                </div>
                <div class="calc-result-item">
                    <div class="calc-result-item-label">Average Word Length</div>
                    <div class="calc-result-item-value average-word-length">0</div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="calc-info" style="margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #0369a1;">How Reading Time is Calculated:</h4>
        <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.5;">
            Reading time is calculated based on an average reading speed of 200 words per minute. This is the typical reading speed for adults reading silently.
        </p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.word-counter-container');
    if (!container) return;
    
    const textarea = container.querySelector('.word-counter-textarea');
    const statsDiv = container.querySelector('.word-stats');
    const clearBtn = container.querySelector('.clear-text-btn');
    const copyBtn = container.querySelector('.copy-btn');
    
    // Elements for displaying counts
    const wordCount = container.querySelector('.word-count');
    const characterCount = container.querySelector('.character-count');
    const characterCountNoSpaces = container.querySelector('.character-count-no-spaces');
    const sentenceCount = container.querySelector('.sentence-count');
    const paragraphCount = container.querySelector('.paragraph-count');
    const lineCount = container.querySelector('.line-count');
    const readingTime = container.querySelector('.reading-time');
    const averageWordLength = container.querySelector('.average-word-length');
    
    // Event listeners
    textarea.addEventListener('input', updateWordCount);
    clearBtn.addEventListener('click', clearText);
    copyBtn.addEventListener('click', copyText);
    
    function updateWordCount() {
        const text = textarea.value;
        
        // Calculate statistics
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        const lines = text.split('\n').length;
        const readingTimeMinutes = Math.ceil(words / 200);
        const avgWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;
        
        // Update display
        wordCount.textContent = words.toLocaleString();
        characterCount.textContent = characters.toLocaleString();
        characterCountNoSpaces.textContent = charactersNoSpaces.toLocaleString();
        sentenceCount.textContent = sentences.toLocaleString();
        paragraphCount.textContent = Math.max(paragraphs, text.trim() === '' ? 0 : 1).toLocaleString();
        lineCount.textContent = lines.toLocaleString();
        readingTime.textContent = readingTimeMinutes;
        averageWordLength.textContent = avgWordLength;
        
        // Update copy button
        copyBtn.setAttribute('data-text', text);
        
        // Show/hide stats
        if (text.trim().length > 0) {
            statsDiv.style.display = 'block';
        } else {
            statsDiv.style.display = 'none';
        }
    }
    
    function clearText() {
        textarea.value = '';
        updateWordCount();
        showMessage('Text cleared successfully!', 'success');
    }
    
    function copyText() {
        const text = textarea.value;
        if (text.trim() === '') {
            showMessage('No text to copy!', 'error');
            return;
        }
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showCopySuccess();
            });
        } else {
            // Fallback
            textarea.select();
            document.execCommand('copy');
            showCopySuccess();
        }
    }
    
    function showCopySuccess() {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }
    
    function showMessage(message, type) {
        const existingMessage = container.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message calc-' + type;
        messageDiv.textContent = message;
        messageDiv.style.marginTop = '10px';
        
        container.appendChild(messageDiv);
        
        setTimeout(function() {
            messageDiv.remove();
        }, 3000);
    }
    
    // Initial count
    updateWordCount();
});
</script>