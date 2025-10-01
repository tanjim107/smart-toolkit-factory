<?php
/**
 * Template Name: Area Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📐 Area Calculator</h1>
            <p class="ct-tool-description">Calculate area of various shapes</p>

            <div class="ct-tabs">
                <div class="ct-tab-list">
                    <button class="ct-tab-button active" data-tab="rectangle">Rectangle</button>
                    <button class="ct-tab-button" data-tab="circle">Circle</button>
                    <button class="ct-tab-button" data-tab="triangle">Triangle</button>
                </div>

                <!-- Rectangle Tab -->
                <div id="rectangle" class="ct-tab-content active">
                    <div class="ct-grid ct-grid-2">
                        <div class="ct-form-group">
                            <label class="ct-label">Length:</label>
                            <input type="number" id="rectLength" class="ct-input" placeholder="Enter length">
                        </div>
                        <div class="ct-form-group">
                            <label class="ct-label">Width:</label>
                            <input type="number" id="rectWidth" class="ct-input" placeholder="Enter width">
                        </div>
                    </div>
                    <button onclick="calculateRectangle()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="rectResult" class="ct-results" style="display: none;"></div>
                </div>

                <!-- Circle Tab -->
                <div id="circle" class="ct-tab-content">
                    <div class="ct-form-group">
                        <label class="ct-label">Radius:</label>
                        <input type="number" id="circleRadius" class="ct-input" placeholder="Enter radius">
                    </div>
                    <button onclick="calculateCircle()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="circleResult" class="ct-results" style="display: none;"></div>
                </div>

                <!-- Triangle Tab -->
                <div id="triangle" class="ct-tab-content">
                    <div class="ct-grid ct-grid-2">
                        <div class="ct-form-group">
                            <label class="ct-label">Base:</label>
                            <input type="number" id="triBase" class="ct-input" placeholder="Enter base">
                        </div>
                        <div class="ct-form-group">
                            <label class="ct-label">Height:</label>
                            <input type="number" id="triHeight" class="ct-input" placeholder="Enter height">
                        </div>
                    </div>
                    <button onclick="calculateTriangle()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="triResult" class="ct-results" style="display: none;"></div>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
function calculateRectangle() {
    const length = parseFloat(document.getElementById('rectLength').value);
    const width = parseFloat(document.getElementById('rectWidth').value);
    
    if (isNaN(length) || isNaN(width)) {
        alert('Please enter valid numbers');
        return;
    }
    
    const area = length * width;
    const perimeter = 2 * (length + width);
    
    document.getElementById('rectResult').style.display = 'block';
    document.getElementById('rectResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Area:</span>
            <span class="ct-result-value ct-text-success">${area.toFixed(2)} sq units</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Perimeter:</span>
            <span class="ct-result-value">${perimeter.toFixed(2)} units</span>
        </div>
    `;
}

function calculateCircle() {
    const radius = parseFloat(document.getElementById('circleRadius').value);
    
    if (isNaN(radius)) {
        alert('Please enter a valid number');
        return;
    }
    
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    
    document.getElementById('circleResult').style.display = 'block';
    document.getElementById('circleResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Area:</span>
            <span class="ct-result-value ct-text-success">${area.toFixed(2)} sq units</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Circumference:</span>
            <span class="ct-result-value">${circumference.toFixed(2)} units</span>
        </div>
    `;
}

function calculateTriangle() {
    const base = parseFloat(document.getElementById('triBase').value);
    const height = parseFloat(document.getElementById('triHeight').value);
    
    if (isNaN(base) || isNaN(height)) {
        alert('Please enter valid numbers');
        return;
    }
    
    const area = 0.5 * base * height;
    
    document.getElementById('triResult').style.display = 'block';
    document.getElementById('triResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Area:</span>
            <span class="ct-result-value ct-text-success">${area.toFixed(2)} sq units</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
