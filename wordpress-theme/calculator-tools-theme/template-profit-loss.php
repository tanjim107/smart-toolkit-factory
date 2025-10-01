<?php
/**
 * Template Name: Profit Loss Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">📈 Profit Loss Calculator</h1>
            <p class="ct-tool-description">Calculate profit or loss percentage and amount</p>

            <div class="ct-grid ct-grid-2">
                <div class="ct-form-group">
                    <label class="ct-label">Cost Price (CP):</label>
                    <input type="number" id="costPrice" class="ct-input" placeholder="Enter cost price">
                </div>
                <div class="ct-form-group">
                    <label class="ct-label">Selling Price (SP):</label>
                    <input type="number" id="sellingPrice" class="ct-input" placeholder="Enter selling price">
                </div>
            </div>

            <button onclick="calculateProfitLoss()" class="ct-btn ct-btn-primary">Calculate</button>

            <div id="plResult" class="ct-results" style="display: none;"></div>
        </div>
    </div>
</main>

<script>
function calculateProfitLoss() {
    const cp = parseFloat(document.getElementById('costPrice').value);
    const sp = parseFloat(document.getElementById('sellingPrice').value);
    
    if (isNaN(cp) || isNaN(sp)) {
        alert('Please enter valid numbers');
        return;
    }
    
    if (cp <= 0 || sp <= 0) {
        alert('Prices must be greater than zero');
        return;
    }
    
    const difference = sp - cp;
    const percentage = (difference / cp) * 100;
    const isProfit = difference > 0;
    const type = isProfit ? 'Profit' : (difference < 0 ? 'Loss' : 'Break Even');
    
    document.getElementById('plResult').style.display = 'block';
    document.getElementById('plResult').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Cost Price:</span>
            <span class="ct-result-value">₹${cp.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Selling Price:</span>
            <span class="ct-result-value">₹${sp.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Result:</span>
            <span class="ct-result-value ${isProfit ? 'ct-text-success' : 'ct-text-danger'}">${type}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">${type} Amount:</span>
            <span class="ct-result-value ${isProfit ? 'ct-text-success' : 'ct-text-danger'}">₹${Math.abs(difference).toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">${type} Percentage:</span>
            <span class="ct-result-value ${isProfit ? 'ct-text-success' : 'ct-text-danger'}">${Math.abs(percentage).toFixed(2)}%</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
