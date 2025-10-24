<?php
/**
 * Template Name: Video to MP3 Converter
 */

get_header();
?>

<div class="calculator-container">
    <h1>Video to MP3 Converter</h1>
    
    <div class="calculator-card">
        <div class="upload-area" id="uploadArea">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <input type="file" id="videoInput" accept="video/*" style="display: none;">
            <button class="btn btn-secondary" onclick="document.getElementById('videoInput').click()">
                Select Video File
            </button>
            <p class="file-info" id="fileInfo"></p>
        </div>

        <button id="convertBtn" class="btn btn-primary" style="display: none; margin-top: 1rem;">
            Convert to MP3
        </button>

        <div id="audioPreview" style="display: none; margin-top: 1.5rem;">
            <audio controls id="audioPlayer" style="width: 100%; margin-bottom: 1rem;"></audio>
            <div style="display: flex; gap: 0.5rem;">
                <button id="downloadBtn" class="btn btn-primary" style="flex: 1;">
                    Download MP3
                </button>
                <button id="resetBtn" class="btn btn-secondary" style="flex: 1;">
                    Convert Another
                </button>
            </div>
        </div>

        <div id="convertingMsg" style="display: none; margin-top: 1rem; text-align: center; color: #666;">
            Converting video to MP3...
        </div>
    </div>

    <div class="info-section">
        <h3>Supported Formats</h3>
        <p>MP4, AVI, MOV, MKV, WebM, and other common video formats</p>
        
        <h3>Features</h3>
        <ul>
            <li>Extract audio from video files</li>
            <li>Convert to MP3 format</li>
            <li>Maximum file size: 100MB</li>
            <li>All processing happens in your browser</li>
        </ul>
    </div>
</div>

<script>
(function() {
    const videoInput = document.getElementById('videoInput');
    const fileInfo = document.getElementById('fileInfo');
    const convertBtn = document.getElementById('convertBtn');
    const audioPreview = document.getElementById('audioPreview');
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const convertingMsg = document.getElementById('convertingMsg');
    
    let selectedFile = null;
    let convertedAudioUrl = null;

    videoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check if it's a video file
        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file');
            return;
        }

        // Check file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
            alert('File size must be less than 100MB');
            return;
        }

        selectedFile = file;
        fileInfo.textContent = file.name + ' (' + (file.size / (1024 * 1024)).toFixed(2) + ' MB)';
        convertBtn.style.display = 'block';
        audioPreview.style.display = 'none';
    });

    convertBtn.addEventListener('click', async function() {
        if (!selectedFile) return;

        convertingMsg.style.display = 'block';
        convertBtn.style.display = 'none';

        try {
            // Create video element
            const video = document.createElement('video');
            video.src = URL.createObjectURL(selectedFile);

            await new Promise(resolve => {
                video.onloadedmetadata = resolve;
            });

            // Create audio context
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaElementSource(video);
            const destination = audioContext.createMediaStreamDestination();
            source.connect(destination);

            // Record the audio
            const mediaRecorder = new MediaRecorder(destination.stream);
            const chunks = [];

            mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = function() {
                const blob = new Blob(chunks, { type: 'audio/mp3' });
                convertedAudioUrl = URL.createObjectURL(blob);
                audioPlayer.src = convertedAudioUrl;
                
                convertingMsg.style.display = 'none';
                audioPreview.style.display = 'block';
            };

            mediaRecorder.start();
            video.play();

            video.onended = function() {
                mediaRecorder.stop();
                audioContext.close();
            };
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Failed to convert video. Please try again.');
            convertingMsg.style.display = 'none';
            convertBtn.style.display = 'block';
        }
    });

    downloadBtn.addEventListener('click', function() {
        if (!convertedAudioUrl) return;

        const link = document.createElement('a');
        link.href = convertedAudioUrl;
        link.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    resetBtn.addEventListener('click', function() {
        selectedFile = null;
        convertedAudioUrl = null;
        videoInput.value = '';
        fileInfo.textContent = '';
        convertBtn.style.display = 'none';
        audioPreview.style.display = 'none';
    });
})();
</script>

<?php get_footer(); ?>
