<?php
/**
 * Template Name: Word Counter
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📝 Word Counter</h1>
            <p class="ct-tool-description">Count words, characters, sentences, and paragraphs</p>

            <div class="ct-form-group">
                <label class="ct-label">Enter or paste your text:</label>
                <textarea id="textInput" class="ct-textarea" placeholder="Type or paste your text here..." oninput="countText()"></textarea>
            </div>

            <div class="ct-grid ct-grid-2">
                <div class="ct-results">
                    <div class="ct-result-item">
                        <span class="ct-result-label">Words:</span>
                        <span id="wordCount" class="ct-result-value">0</span>
                    </div>
                    <div class="ct-result-item">
                        <span class="ct-result-label">Characters:</span>
                        <span id="charCount" class="ct-result-value">0</span>
                    </div>
                </div>

                <div class="ct-results">
                    <div class="ct-result-item">
                        <span class="ct-result-label">Sentences:</span>
                        <span id="sentenceCount" class="ct-result-value">0</span>
                    </div>
                    <div class="ct-result-item">
                        <span class="ct-result-label">Paragraphs:</span>
                        <span id="paragraphCount" class="ct-result-value">0</span>
                    </div>
                </div>
            </div>

            <div class="ct-results ct-mt-2">
                <div class="ct-result-item">
                    <span class="ct-result-label">Reading Time:</span>
                    <span id="readingTime" class="ct-result-value">0 min</span>
                </div>
                <div class="ct-result-item">
                    <span class="ct-result-label">Speaking Time:</span>
                    <span id="speakingTime" class="ct-result-value">0 min</span>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
function countText() {
    const text = document.getElementById('textInput').value;
    
    // Count words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Count characters
    const charCount = text.length;
    
    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Count paragraphs
    const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);
    
    // Calculate speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(wordCount / 130);
    
    // Update display
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('charCount').textContent = charCount;
    document.getElementById('sentenceCount').textContent = sentenceCount;
    document.getElementById('paragraphCount').textContent = paragraphCount;
    document.getElementById('readingTime').textContent = readingTime + ' min';
    document.getElementById('speakingTime').textContent = speakingTime + ' min';
}
</script>

<?php get_footer(); ?>
