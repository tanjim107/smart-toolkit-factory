<?php
if (!defined('ABSPATH')) {
    exit;
}

$tools = array(
    array(
        'name' => 'Percentage Calculator',
        'description' => 'Calculate percentages with three different methods',
        'shortcode' => '[percentage_calculator]',
        'icon' => '📊'
    ),
    array(
        'name' => 'GST Calculator',
        'description' => 'Add or remove GST from amounts with all Indian GST rates',
        'shortcode' => '[gst_calculator]',
        'icon' => '💰'
    ),
    array(
        'name' => 'EMI Calculator',
        'description' => 'Calculate Equated Monthly Installments for loans',
        'shortcode' => '[emi_calculator]',
        'icon' => '🏦'
    ),
    array(
        'name' => 'Password Generator',
        'description' => 'Generate secure passwords with customizable options',
        'shortcode' => '[password_generator]',
        'icon' => '🔐'
    ),
    array(
        'name' => 'QR Code Generator',
        'description' => 'Create custom QR codes for text, URLs, emails, and phone numbers',
        'shortcode' => '[qr_code_generator]',
        'icon' => '📱'
    ),
    array(
        'name' => 'Word Counter',
        'description' => 'Count words, characters, sentences, and paragraphs',
        'shortcode' => '[word_counter]',
        'icon' => '📝'
    ),
    array(
        'name' => 'Age Calculator',
        'description' => 'Calculate precise age from birthdate',
        'shortcode' => '[age_calculator]',
        'icon' => '🎂'
    ),
    array(
        'name' => 'Date Difference',
        'description' => 'Calculate the difference between two dates',
        'shortcode' => '[date_difference]',
        'icon' => '📅'
    ),
    array(
        'name' => 'Profit Loss Calculator',
        'description' => 'Calculate profit or loss from cost and selling price',
        'shortcode' => '[profit_loss]',
        'icon' => '📈'
    ),
    array(
        'name' => 'Area Calculator',
        'description' => 'Calculate areas of various shapes',
        'shortcode' => '[area_calculator]',
        'icon' => '📐'
    ),
    array(
        'name' => 'eCommerce Profit Calculator',
        'description' => 'Calculate online store profitability',
        'shortcode' => '[ecommerce_profit]',
        'icon' => '🛒'
    ),
    array(
        'name' => 'Gmail Generator',
        'description' => 'Generate multiple Gmail variations',
        'shortcode' => '[gmail_generator]',
        'icon' => '📧'
    ),
    array(
        'name' => 'Image Converter',
        'description' => 'Convert images between different formats',
        'shortcode' => '[image_converter]',
        'icon' => '🖼️'
    ),
    array(
        'name' => 'Image Compressor',
        'description' => 'Compress images to reduce file size',
        'shortcode' => '[image_compressor]',
        'icon' => '📷'
    ),
    array(
        'name' => 'Image to QR Code',
        'description' => 'Convert uploaded images into QR codes',
        'shortcode' => '[image_to_qr]',
        'icon' => '🔗'
    )
);

$columns = isset($atts['columns']) ? intval($atts['columns']) : 3;
$custom_class = isset($atts['class']) ? $atts['class'] : '';
?>

<div class="calc-tools-container tools-list-container <?php echo esc_attr($custom_class); ?>">
    <div class="calc-tools-header">
        <h2 class="calc-tools-title">Calculator Tools</h2>
        <p class="calc-tools-description">Choose from our collection of useful calculators and tools</p>
    </div>
    
    <div class="tools-grid" style="grid-template-columns: repeat(<?php echo $columns; ?>, 1fr);">
        <?php foreach ($tools as $tool): ?>
            <div class="tool-card" onclick="insertShortcode('<?php echo esc_js($tool['shortcode']); ?>')">
                <div class="tool-icon"><?php echo $tool['icon']; ?></div>
                <h3 class="tool-name"><?php echo esc_html($tool['name']); ?></h3>
                <p class="tool-description"><?php echo esc_html($tool['description']); ?></p>
                <div class="tool-shortcode" style="margin-top: 10px; font-family: monospace; font-size: 12px; color: #666; background: #f5f5f5; padding: 5px 8px; border-radius: 4px;">
                    <?php echo esc_html($tool['shortcode']); ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    
    <div class="calc-info" style="margin-top: 30px; padding: 20px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h4 style="margin: 0 0 15px 0; color: #0369a1;">How to Use These Tools:</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #0f172a; line-height: 1.6;">
            <li>Click on any tool card above to copy its shortcode</li>
            <li>Paste the shortcode into any post, page, or widget</li>
            <li>Save your content and the calculator will appear automatically</li>
            <li>All tools are responsive and work on all devices</li>
        </ol>
        
        <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e0e7ff;">
            <strong>Example:</strong> To add a percentage calculator to your page, simply add <code>[percentage_calculator]</code> to your content.
        </div>
    </div>
</div>

<script>
function insertShortcode(shortcode) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shortcode).then(function() {
            showMessage('Shortcode copied to clipboard: ' + shortcode, 'success');
        }).catch(function() {
            showMessage('Failed to copy shortcode. Please copy manually: ' + shortcode, 'error');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shortcode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showMessage('Shortcode copied to clipboard: ' + shortcode, 'success');
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.tools-message');
    existingMessages.forEach(function(msg) {
        msg.remove();
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'tools-message calc-' + type;
    messageDiv.textContent = message;
    messageDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 14px; max-width: 350px;';
    
    if (type === 'success') {
        messageDiv.style.background = '#d1fae5';
        messageDiv.style.color = '#065f46';
        messageDiv.style.border = '1px solid #a7f3d0';
    } else {
        messageDiv.style.background = '#fee2e2';
        messageDiv.style.color = '#dc2626';
        messageDiv.style.border = '1px solid #fecaca';
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(function() {
        messageDiv.remove();
    }, 4000);
}
</script>