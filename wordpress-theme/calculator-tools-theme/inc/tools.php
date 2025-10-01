<?php
/**
 * Tool helper functions
 */

// Get all available tools
function calculator_tools_get_tools() {
    return array(
        array(
            'name' => 'Percentage Calculator',
            'slug' => 'percentage-calculator',
            'description' => 'Calculate percentages, increase, decrease, and more',
            'icon' => '📊',
            'template' => 'template-percentage-calculator.php'
        ),
        array(
            'name' => 'GST Calculator',
            'slug' => 'gst-calculator',
            'description' => 'Calculate GST inclusive and exclusive amounts',
            'icon' => '💰',
            'template' => 'template-gst-calculator.php'
        ),
        array(
            'name' => 'EMI Calculator',
            'slug' => 'emi-calculator',
            'description' => 'Calculate your loan EMI and interest',
            'icon' => '🏦',
            'template' => 'template-emi-calculator.php'
        ),
        array(
            'name' => 'Password Generator',
            'slug' => 'password-generator',
            'description' => 'Generate secure random passwords',
            'icon' => '🔐',
            'template' => 'template-password-generator.php'
        ),
        array(
            'name' => 'Word Counter',
            'slug' => 'word-counter',
            'description' => 'Count words, characters, and sentences',
            'icon' => '📝',
            'template' => 'template-word-counter.php'
        ),
        array(
            'name' => 'QR Code Generator',
            'slug' => 'qr-generator',
            'description' => 'Generate QR codes for text and URLs',
            'icon' => '📱',
            'template' => 'template-qr-generator.php'
        ),
        array(
            'name' => 'Age Calculator',
            'slug' => 'age-calculator',
            'description' => 'Calculate your exact age in years, months, and days',
            'icon' => '🎂',
            'template' => 'template-age-calculator.php'
        ),
        array(
            'name' => 'Profit Loss Calculator',
            'slug' => 'profit-loss',
            'description' => 'Calculate profit or loss percentage',
            'icon' => '📈',
            'template' => 'template-profit-loss.php'
        ),
        array(
            'name' => 'Date Difference Calculator',
            'slug' => 'date-difference',
            'description' => 'Calculate the difference between two dates',
            'icon' => '📅',
            'template' => 'template-date-difference.php'
        ),
        array(
            'name' => 'Area Calculator',
            'slug' => 'area-calculator',
            'description' => 'Calculate area of various shapes',
            'icon' => '📐',
            'template' => 'template-area-calculator.php'
        ),
    );
}

// Get tool by slug
function calculator_tools_get_tool($slug) {
    $tools = calculator_tools_get_tools();
    foreach ($tools as $tool) {
        if ($tool['slug'] === $slug) {
            return $tool;
        }
    }
    return null;
}
