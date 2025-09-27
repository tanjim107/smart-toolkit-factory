<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container percentage-calculator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Calculate percentages with three different methods</p>
    </div>
    
    <div class="calc-tabs">
        <div class="calc-tabs-list">
            <button class="calc-tab-trigger active" data-target="find">Find Percentage</button>
            <button class="calc-tab-trigger" data-target="calculate">Calculate Percentage</button>
            <button class="calc-tab-trigger" data-target="value">Find Value</button>
        </div>
        
        <!-- Find Percentage Tab -->
        <div class="calc-tab-content active" data-tab="find">
            <form class="calc-form" data-tool="percentage">
                <input type="hidden" name="calc_type" value="find">
                
                <div class="calc-grid calc-grid-2">
                    <div class="calc-form-group">
                        <label class="calc-form-label">Value</label>
                        <input type="number" name="value" class="calc-form-input" placeholder="Enter value" step="any" required>
                    </div>
                    
                    <div class="calc-form-group">
                        <label class="calc-form-label">Percentage (%)</label>
                        <input type="number" name="percent" class="calc-form-input" placeholder="Enter percentage" step="any" required>
                    </div>
                </div>
                
                <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
            </form>
        </div>
        
        <!-- Calculate Percentage Tab -->
        <div class="calc-tab-content" data-tab="calculate">
            <form class="calc-form" data-tool="percentage">
                <input type="hidden" name="calc_type" value="calculate">
                
                <div class="calc-grid calc-grid-2">
                    <div class="calc-form-group">
                        <label class="calc-form-label">Part Value</label>
                        <input type="number" name="part" class="calc-form-input" placeholder="Enter part value" step="any" required>
                    </div>
                    
                    <div class="calc-form-group">
                        <label class="calc-form-label">Total Value</label>
                        <input type="number" name="total" class="calc-form-input" placeholder="Enter total value" step="any" required>
                    </div>
                </div>
                
                <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
            </form>
        </div>
        
        <!-- Find Value Tab -->
        <div class="calc-tab-content" data-tab="value">
            <form class="calc-form" data-tool="percentage">
                <input type="hidden" name="calc_type" value="value">
                
                <div class="calc-grid calc-grid-2">
                    <div class="calc-form-group">
                        <label class="calc-form-label">Known Value</label>
                        <input type="number" name="known_value" class="calc-form-input" placeholder="Enter known value" step="any" required>
                    </div>
                    
                    <div class="calc-form-group">
                        <label class="calc-form-label">Percentage (%)</label>
                        <input type="number" name="known_percent" class="calc-form-input" placeholder="Enter percentage" step="any" required>
                    </div>
                </div>
                
                <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
            </form>
        </div>
    </div>
</div>