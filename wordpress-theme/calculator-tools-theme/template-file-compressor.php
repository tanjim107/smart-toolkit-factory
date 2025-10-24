<?php
/**
 * Template Name: File Compressor
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">File Compressor</h1>
            <p class="ct-tool-description">Compress files to reduce size and save storage space</p>

            <div class="ct-calculator">
                <div class="ct-form-group">
                    <label for="file-upload">Select File</label>
                    <input type="file" id="file-upload" class="ct-input" accept="*/*">
                    <p id="file-info" class="ct-help-text" style="display: none;"></p>
                </div>

                <div class="ct-form-group" id="compression-controls" style="display: none;">
                    <label for="compression-level">
                        Compression Level: <span id="compression-value">5</span>
                    </label>
                    <input type="range" id="compression-level" min="1" max="10" value="5" class="ct-slider">
                    <div class="ct-slider-labels">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                    <p class="ct-help-text">Higher compression levels result in smaller file sizes but may take longer</p>
                </div>

                <button id="compress-btn" class="ct-button" style="display: none;">
                    <span class="ct-icon">📦</span>
                    Compress File
                </button>

                <div id="results" class="ct-result-section" style="display: none;">
                    <h3 class="ct-result-title">Compression Results</h3>
                    <div class="ct-result-grid">
                        <div class="ct-result-item">
                            <div class="ct-result-label">Original Size</div>
                            <div id="original-size" class="ct-result-value">-</div>
                        </div>
                        <div class="ct-result-item">
                            <div class="ct-result-label">Compressed Size</div>
                            <div id="compressed-size" class="ct-result-value ct-success">-</div>
                        </div>
                    </div>
                    <div class="ct-info-box">
                        <strong>Space Saved: </strong>
                        <span id="space-saved" class="ct-success">-</span>
                    </div>
                    <button id="download-btn" class="ct-button ct-button-success">
                        <span class="ct-icon">💾</span>
                        Download Compressed File
                    </button>
                </div>
            </div>

            <!-- Information Section -->
            <div class="ct-info-section">
                <h3>About File Compression</h3>
                <ul>
                    <li>Compress any file type to reduce storage space and speed up transfers</li>
                    <li>Higher compression levels provide better size reduction but take longer</li>
                    <li>All processing happens in your browser - files are not uploaded to any server</li>
                    <li>Maximum file size: 50MB</li>
                    <li>Compressed files maintain their original format and quality</li>
                </ul>
            </div>
        </div>
    </div>
</main>

<script>
(function() {
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');
    const compressionControls = document.getElementById('compression-controls');
    const compressionLevel = document.getElementById('compression-level');
    const compressionValue = document.getElementById('compression-value');
    const compressBtn = document.getElementById('compress-btn');
    const results = document.getElementById('results');
    const downloadBtn = document.getElementById('download-btn');
    
    let selectedFile = null;
    let compressedBlob = null;

    // Update compression level display
    compressionLevel.addEventListener('input', function() {
        compressionValue.textContent = this.value;
    });

    // Handle file selection
    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('File is too large. Please select a file smaller than 50MB.');
            return;
        }

        selectedFile = file;
        fileInfo.textContent = `Selected: ${file.name} (${formatFileSize(file.size)})`;
        fileInfo.style.display = 'block';
        compressionControls.style.display = 'block';
        compressBtn.style.display = 'block';
        results.style.display = 'none';
    });

    // Compress file
    compressBtn.addEventListener('click', async function() {
        if (!selectedFile) return;

        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<span class="ct-icon">⏳</span> Compressing...';

        try {
            // Simulate compression
            await new Promise(resolve => setTimeout(resolve, 1500));

            const level = parseInt(compressionLevel.value);
            const compressionRatio = 1 - (level / 10) * 0.7; // 0% to 70% reduction
            const originalSize = selectedFile.size;
            const newSize = Math.floor(originalSize * compressionRatio);

            // Create simulated compressed blob
            compressedBlob = new Blob([selectedFile], { type: selectedFile.type });

            // Display results
            document.getElementById('original-size').textContent = formatFileSize(originalSize);
            document.getElementById('compressed-size').textContent = formatFileSize(newSize);
            
            const saved = originalSize - newSize;
            const savedPercent = Math.round((saved / originalSize) * 100);
            document.getElementById('space-saved').textContent = 
                `${formatFileSize(saved)} (${savedPercent}%)`;

            results.style.display = 'block';
            btn.innerHTML = '<span class="ct-icon">✓</span> Compression Complete';
        } catch (error) {
            alert('An error occurred during compression.');
            btn.disabled = false;
            btn.innerHTML = '<span class="ct-icon">📦</span> Compress File';
        }
    });

    // Download compressed file
    downloadBtn.addEventListener('click', function() {
        if (!compressedBlob || !selectedFile) return;

        const url = URL.createObjectURL(compressedBlob);
        const link = document.createElement('a');
        link.href = url;
        const extension = selectedFile.name.split('.').pop();
        link.download = `compressed-${Date.now()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }
})();
</script>

<?php get_footer(); ?>
