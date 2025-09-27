<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="calc-tools-container gst-calculator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Add or remove GST from amounts with all Indian GST rates</p>
    </div>
    
    <div class="calc-tabs">
        <div class="calc-tabs-list">
            <button class="calc-tab-trigger active" data-target="add">Add GST</button>
            <button class="calc-tab-trigger" data-target="remove">Remove GST</button>
        </div>
        
        <!-- Add GST Tab -->
        <div class="calc-tab-content active" data-tab="add">
            <form class="calc-form" data-tool="gst">
                <input type="hidden" name="calc_type" value="add">
                
                <div class="calc-grid calc-grid-2">
                    <div class="calc-form-group">
                        <label class="calc-form-label">Amount (Without GST)</label>
                        <input type="number" name="amount" class="calc-form-input" placeholder="Enter amount" step="0.01" required>
                    </div>
                    
                    <div class="calc-form-group">
                        <label class="calc-form-label">GST Rate (%)</label>
                        <select name="gst_rate" class="calc-form-select" required>
                            <option value="">Select GST Rate</option>
                            <option value="0">0% (Exempted)</option>
                            <option value="3">3% (Essential goods)</option>
                            <option value="5">5% (Household items)</option>
                            <option value="12">12% (Standard rate)</option>
                            <option value="18" selected>18% (Standard rate)</option>
                            <option value="28">28% (Luxury items)</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
            </form>
        </div>
        
        <!-- Remove GST Tab -->
        <div class="calc-tab-content" data-tab="remove">
            <form class="calc-form" data-tool="gst">
                <input type="hidden" name="calc_type" value="remove">
                
                <div class="calc-grid calc-grid-2">
                    <div class="calc-form-group">
                        <label class="calc-form-label">Amount (Including GST)</label>
                        <input type="number" name="amount" class="calc-form-input" placeholder="Enter amount with GST" step="0.01" required>
                    </div>
                    
                    <div class="calc-form-group">
                        <label class="calc-form-label">GST Rate (%)</label>
                        <select name="gst_rate" class="calc-form-select" required>
                            <option value="">Select GST Rate</option>
                            <option value="0">0% (Exempted)</option>
                            <option value="3">3% (Essential goods)</option>
                            <option value="5">5% (Household items)</option>
                            <option value="12">12% (Standard rate)</option>
                            <option value="18" selected>18% (Standard rate)</option>
                            <option value="28">28% (Luxury items)</option>
                        </select>
                    </div>
                </div>
                
                <button type="submit" class="calc-btn calc-btn-primary">Calculate</button>
            </form>
        </div>
    </div>
    
    <div class="calc-info" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 14px; color: #666;">
        <h4 style="margin: 0 0 10px 0; color: #333;">GST Rate Guide:</h4>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>0%:</strong> Essential items like books, newspapers, fresh vegetables</li>
            <li><strong>3%:</strong> Gold, silver, and precious stones</li>
            <li><strong>5%:</strong> Household necessities, medicines, food items</li>
            <li><strong>12%:</strong> Computer and IT products, processed food</li>
            <li><strong>18%:</strong> Most goods and services (standard rate)</li>
            <li><strong>28%:</strong> Luxury items, automobiles, tobacco products</li>
        </ul>
    </div>
</div>