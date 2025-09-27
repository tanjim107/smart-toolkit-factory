<?php if (!defined('ABSPATH')) exit; ?>

<div class="calc-tools-container profit-loss-calculator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Calculate profit or loss from cost and selling price</p>
    </div>
    
    <form class="calc-form" data-tool="profit_loss">
        <div class="calc-grid calc-grid-2">
            <div class="calc-form-group">
                <label class="calc-form-label">Cost Price (₹)</label>
                <input type="number" name="cost_price" class="calc-form-input" placeholder="Enter cost price" step="0.01" required>
            </div>
            <div class="calc-form-group">
                <label class="calc-form-label">Selling Price (₹)</label>
                <input type="number" name="selling_price" class="calc-form-input" placeholder="Enter selling price" step="0.01" required>
            </div>
        </div>
        
        <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
    </form>
</div>