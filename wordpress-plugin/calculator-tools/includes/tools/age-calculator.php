<?php if (!defined('ABSPATH')) exit; ?>

<div class="calc-tools-container age-calculator-container">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title"><?php echo esc_html($atts['title']); ?></h2>
        <p class="calc-tools-description">Calculate precise age from birthdate</p>
    </div>
    
    <form class="calc-form" data-tool="age">
        <div class="calc-form-group">
            <label class="calc-form-label">Birth Date</label>
            <input type="date" name="birth_date" class="calc-form-input" required>
        </div>
        
        <button type="submit" class="calc-btn calc-btn-primary">Calculate Age</button>
    </form>
</div>