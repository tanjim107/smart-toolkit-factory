<?php
/**
 * Template Name: Percentage Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📊 Percentage Calculator</h1>
            <p class="ct-tool-description">Calculate percentages, increases, decreases, and more</p>

            <div class="ct-tabs">
                <div class="ct-tab-list">
                    <button class="ct-tab-button active" data-tab="tab1">What is X% of Y?</button>
                    <button class="ct-tab-button" data-tab="tab2">X is what % of Y?</button>
                    <button class="ct-tab-button" data-tab="tab3">% Increase/Decrease</button>
                </div>

                <!-- Tab 1: What is X% of Y -->
                <div id="tab1" class="ct-tab-content active">
                    <div class="ct-grid ct-grid-2">
                        <div class="ct-form-group">
                            <label class="ct-label">Percentage (%)</label>
                            <input type="number" id="percent1" class="ct-input" placeholder="Enter percentage">
                        </div>
                        <div class="ct-form-group">
                            <label class="ct-label">Of Number</label>
                            <input type="number" id="number1" class="ct-input" placeholder="Enter number">
                        </div>
                    </div>
                    <button onclick="calculateTab1()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="result1" class="ct-results" style="display: none;"></div>
                </div>

                <!-- Tab 2: X is what % of Y -->
                <div id="tab2" class="ct-tab-content">
                    <div class="ct-grid ct-grid-2">
                        <div class="ct-form-group">
                            <label class="ct-label">Number</label>
                            <input type="number" id="number2a" class="ct-input" placeholder="Enter number">
                        </div>
                        <div class="ct-form-group">
                            <label class="ct-label">Of Number</label>
                            <input type="number" id="number2b" class="ct-input" placeholder="Enter number">
                        </div>
                    </div>
                    <button onclick="calculateTab2()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="result2" class="ct-results" style="display: none;"></div>
                </div>

                <!-- Tab 3: Percentage Increase/Decrease -->
                <div id="tab3" class="ct-tab-content">
                    <div class="ct-grid ct-grid-2">
                        <div class="ct-form-group">
                            <label class="ct-label">Original Value</label>
                            <input type="number" id="original" class="ct-input" placeholder="Enter original value">
                        </div>
                        <div class="ct-form-group">
                            <label class="ct-label">New Value</label>
                            <input type="number" id="newValue" class="ct-input" placeholder="Enter new value">
                        </div>
                    </div>
                    <button onclick="calculateTab3()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="result3" class="ct-results" style="display: none;"></div>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
function calculateTab1() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const number = parseFloat(document.getElementById('number1').value);
    
    if (isNaN(percent) || isNaN(number)) {
        alert('Please enter valid numbers');
        return;
    }
    
    const result = (percent / 100) * number;
    document.getElementById('result1').style.display = 'block';
    document.getElementById('result1').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Result:</span>
            <span class="ct-result-value">${result.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Formula:</span>
            <span>${percent}% of ${number} = ${result.toFixed(2)}</span>
        </div>
    `;
}

function calculateTab2() {
    const numberA = parseFloat(document.getElementById('number2a').value);
    const numberB = parseFloat(document.getElementById('number2b').value);
    
    if (isNaN(numberA) || isNaN(numberB) || numberB === 0) {
        alert('Please enter valid numbers');
        return;
    }
    
    const result = (numberA / numberB) * 100;
    document.getElementById('result2').style.display = 'block';
    document.getElementById('result2').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Result:</span>
            <span class="ct-result-value">${result.toFixed(2)}%</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Formula:</span>
            <span>${numberA} is ${result.toFixed(2)}% of ${numberB}</span>
        </div>
    `;
}

function calculateTab3() {
    const original = parseFloat(document.getElementById('original').value);
    const newVal = parseFloat(document.getElementById('newValue').value);
    
    if (isNaN(original) || isNaN(newVal) || original === 0) {
        alert('Please enter valid numbers');
        return;
    }
    
    const change = newVal - original;
    const percentChange = (change / original) * 100;
    const isIncrease = change > 0;
    
    document.getElementById('result3').style.display = 'block';
    document.getElementById('result3').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Change:</span>
            <span class="ct-result-value ${isIncrease ? 'ct-text-success' : 'ct-text-danger'}">
                ${isIncrease ? '+' : ''}${percentChange.toFixed(2)}%
            </span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Absolute Change:</span>
            <span>${isIncrease ? '+' : ''}${change.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Type:</span>
            <span>${isIncrease ? 'Increase' : 'Decrease'}</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
