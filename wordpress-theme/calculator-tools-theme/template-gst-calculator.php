<?php
/**
 * Template Name: GST Calculator
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">💰 GST Calculator</h1>
            <p class="ct-tool-description">Calculate GST inclusive and exclusive amounts</p>

            <div class="ct-tabs">
                <div class="ct-tab-list">
                    <button class="ct-tab-button active" data-tab="add-gst">Add GST</button>
                    <button class="ct-tab-button" data-tab="remove-gst">Remove GST</button>
                </div>

                <!-- Add GST Tab -->
                <div id="add-gst" class="ct-tab-content active">
                    <div class="ct-form-group">
                        <label class="ct-label">Amount (Exclusive of GST)</label>
                        <input type="number" id="amountAddGst" class="ct-input" placeholder="Enter amount">
                    </div>
                    <div class="ct-form-group">
                        <label class="ct-label">GST Rate (%)</label>
                        <select id="gstRateAdd" class="ct-select">
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18" selected>18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>
                    <button onclick="calculateAddGst()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="resultAddGst" class="ct-results" style="display: none;"></div>
                </div>

                <!-- Remove GST Tab -->
                <div id="remove-gst" class="ct-tab-content">
                    <div class="ct-form-group">
                        <label class="ct-label">Amount (Inclusive of GST)</label>
                        <input type="number" id="amountRemoveGst" class="ct-input" placeholder="Enter amount">
                    </div>
                    <div class="ct-form-group">
                        <label class="ct-label">GST Rate (%)</label>
                        <select id="gstRateRemove" class="ct-select">
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18" selected>18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>
                    <button onclick="calculateRemoveGst()" class="ct-btn ct-btn-primary">Calculate</button>
                    <div id="resultRemoveGst" class="ct-results" style="display: none;"></div>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
function calculateAddGst() {
    const amount = parseFloat(document.getElementById('amountAddGst').value);
    const gstRate = parseFloat(document.getElementById('gstRateAdd').value);
    
    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }
    
    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;
    
    document.getElementById('resultAddGst').style.display = 'block';
    document.getElementById('resultAddGst').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Original Amount:</span>
            <span class="ct-result-value">₹${amount.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">GST (${gstRate}%):</span>
            <span class="ct-result-value">₹${gstAmount.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Total Amount:</span>
            <span class="ct-result-value ct-text-success">₹${totalAmount.toFixed(2)}</span>
        </div>
    `;
}

function calculateRemoveGst() {
    const totalAmount = parseFloat(document.getElementById('amountRemoveGst').value);
    const gstRate = parseFloat(document.getElementById('gstRateRemove').value);
    
    if (isNaN(totalAmount)) {
        alert('Please enter a valid amount');
        return;
    }
    
    const baseAmount = totalAmount / (1 + gstRate / 100);
    const gstAmount = totalAmount - baseAmount;
    
    document.getElementById('resultRemoveGst').style.display = 'block';
    document.getElementById('resultRemoveGst').innerHTML = `
        <div class="ct-result-item">
            <span class="ct-result-label">Total Amount:</span>
            <span class="ct-result-value">₹${totalAmount.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">GST (${gstRate}%):</span>
            <span class="ct-result-value">₹${gstAmount.toFixed(2)}</span>
        </div>
        <div class="ct-result-item">
            <span class="ct-result-label">Base Amount:</span>
            <span class="ct-result-value ct-text-success">₹${baseAmount.toFixed(2)}</span>
        </div>
    `;
}
</script>

<?php get_footer(); ?>
