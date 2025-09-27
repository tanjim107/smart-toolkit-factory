<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container emi-calculator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Calculate Equated Monthly Installments for loans</p>
    </div>
    
    <form class="calc-form" data-tool="emi">
        <div class="calc-grid calc-grid-3">
            <div class="calc-form-group">
                <label class="calc-form-label">Principal Amount (₹)</label>
                <input type="number" name="principal" class="calc-form-input" placeholder="Enter loan amount" step="1000" min="1000" required>
                <small style="color: #666; font-size: 12px;">Minimum: ₹1,000</small>
            </div>
            
            <div class="calc-form-group">
                <label class="calc-form-label">Interest Rate (% per annum)</label>
                <input type="number" name="rate" class="calc-form-input" placeholder="Enter interest rate" step="0.1" min="0.1" max="50" required>
                <small style="color: #666; font-size: 12px;">Annual interest rate</small>
            </div>
            
            <div class="calc-form-group">
                <label class="calc-form-label">Loan Tenure</label>
                <select name="tenure_type" class="calc-form-select" style="margin-bottom: 8px;">
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                </select>
                <input type="number" name="tenure" class="calc-form-input" placeholder="Enter tenure" min="1" required>
            </div>
        </div>
        
        <button type="submit" class="calc-btn calc-btn-primary">Calculate EMI</button>
    </form>
    
    <div class="calc-info" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #333;">How EMI is Calculated:</h4>
        <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">
            EMI = [P x R x (1+R)^N] / [(1+R)^N-1]<br>
            Where: P = Principal, R = Monthly Interest Rate, N = Number of months
        </p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Handle tenure type change
    const tenureTypeSelects = document.querySelectorAll('select[name="tenure_type"]');
    tenureTypeSelects.forEach(function(select) {
        select.addEventListener('change', function() {
            const tenureInput = this.parentNode.querySelector('input[name="tenure"]');
            if (this.value === 'years') {
                tenureInput.placeholder = 'Enter years';
                tenureInput.max = '30';
            } else {
                tenureInput.placeholder = 'Enter months';
                tenureInput.max = '360';
            }
        });
    });
    
    // Convert years to months before form submission
    document.querySelectorAll('.emi-calculator-container .calc-form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const tenureType = this.querySelector('select[name="tenure_type"]').value;
            const tenureInput = this.querySelector('input[name="tenure"]');
            
            if (tenureType === 'years') {
                // Convert years to months
                const years = parseInt(tenureInput.value);
                tenureInput.value = years * 12;
            }
        });
    });
});
</script>