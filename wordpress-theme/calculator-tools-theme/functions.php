<?php
/**
 * Calculator Tools Theme Functions
 */

// Theme setup
function calculator_tools_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'calculator-tools'),
    ));
}
add_action('after_setup_theme', 'calculator_tools_theme_setup');

// Enqueue styles and scripts
function calculator_tools_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style('calculator-tools-style', get_template_directory_uri() . '/assets/css/style.css', array(), '1.0.0');
    
    // Enqueue scripts
    wp_enqueue_script('calculator-tools-script', get_template_directory_uri() . '/assets/js/script.js', array('jquery'), '1.0.0', true);
    
    // Enqueue Chart.js for EMI calculator
    wp_enqueue_script('chartjs', 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', array(), '4.4.0', true);
    
    // Enqueue QRCode.js for QR code generator
    wp_enqueue_script('qrcodejs', 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'calculator_tools_enqueue_assets');

// Include tool templates
require_once get_template_directory() . '/inc/tools.php';

// Register custom page templates
function calculator_tools_page_templates($templates) {
    $templates['template-tools-list.php'] = 'Tools List';
    $templates['template-percentage-calculator.php'] = 'Percentage Calculator';
    $templates['template-gst-calculator.php'] = 'GST Calculator';
    $templates['template-emi-calculator.php'] = 'EMI Calculator';
    $templates['template-password-generator.php'] = 'Password Generator';
    $templates['template-word-counter.php'] = 'Word Counter';
    $templates['template-qr-generator.php'] = 'QR Code Generator';
    $templates['template-age-calculator.php'] = 'Age Calculator';
    $templates['template-profit-loss.php'] = 'Profit Loss Calculator';
    $templates['template-date-difference.php'] = 'Date Difference Calculator';
    $templates['template-area-calculator.php'] = 'Area Calculator';
    $templates['template-file-compressor.php'] = 'File Compressor';
    return $templates;
}
add_filter('theme_page_templates', 'calculator_tools_page_templates');
