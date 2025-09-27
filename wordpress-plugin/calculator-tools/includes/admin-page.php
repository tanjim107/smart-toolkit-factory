<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1>Calculator Tools</h1>
    
    <div class="card" style="max-width: none;">
        <h2>Available Shortcodes</h2>
        <p>Use these shortcodes to embed calculator tools anywhere on your WordPress site:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
            
            <div class="postbox">
                <h3>Percentage Calculator</h3>
                <div class="inside">
                    <code>[percentage_calculator]</code>
                    <p>Calculate percentages with three different methods: find percentage, calculate percentage, and find value.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>GST Calculator</h3>
                <div class="inside">
                    <code>[gst_calculator]</code>
                    <p>Add or remove GST from amounts with support for all Indian GST rates.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>EMI Calculator</h3>
                <div class="inside">
                    <code>[emi_calculator]</code>
                    <p>Calculate Equated Monthly Installments for loans with principal, rate, and tenure.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Password Generator</h3>
                <div class="inside">
                    <code>[password_generator]</code>
                    <p>Generate secure passwords with customizable length and character types.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>QR Code Generator</h3>
                <div class="inside">
                    <code>[qr_code_generator]</code>
                    <p>Create QR codes for text, URLs, emails, and phone numbers.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Word Counter</h3>
                <div class="inside">
                    <code>[word_counter]</code>
                    <p>Count words, characters, sentences, and paragraphs in text.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Age Calculator</h3>
                <div class="inside">
                    <code>[age_calculator]</code>
                    <p>Calculate precise age from birthdate in years, months, and days.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Date Difference</h3>
                <div class="inside">
                    <code>[date_difference]</code>
                    <p>Calculate the difference between two dates.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Profit Loss Calculator</h3>
                <div class="inside">
                    <code>[profit_loss]</code>
                    <p>Calculate profit or loss percentage from cost and selling price.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Area Calculator</h3>
                <div class="inside">
                    <code>[area_calculator]</code>
                    <p>Calculate areas of various shapes including square, rectangle, circle, and triangle.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>eCommerce Profit Calculator</h3>
                <div class="inside">
                    <code>[ecommerce_profit]</code>
                    <p>Calculate online store profitability including fees and expenses.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Gmail Generator</h3>
                <div class="inside">
                    <code>[gmail_generator]</code>
                    <p>Generate multiple Gmail variations from a base email address.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Image Converter</h3>
                <div class="inside">
                    <code>[image_converter]</code>
                    <p>Convert images between different formats (JPG, PNG, WebP).</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Image Compressor</h3>
                <div class="inside">
                    <code>[image_compressor]</code>
                    <p>Compress images to reduce file size while maintaining quality.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>Image to QR Code</h3>
                <div class="inside">
                    <code>[image_to_qr]</code>
                    <p>Convert uploaded images into QR codes.</p>
                </div>
            </div>
            
            <div class="postbox">
                <h3>All Tools List</h3>
                <div class="inside">
                    <code>[calculator_tools_list]</code>
                    <p>Display a grid of all available calculator tools with links.</p>
                    <p><strong>Attributes:</strong></p>
                    <ul>
                        <li><code>columns="3"</code> - Number of columns (default: 3)</li>
                        <li><code>class="custom-class"</code> - Custom CSS class</li>
                    </ul>
                </div>
            </div>
            
        </div>
        
        <h2 style="margin-top: 40px;">Shortcode Attributes</h2>
        <p>All calculator shortcodes support these common attributes:</p>
        <ul>
            <li><code>title="Custom Title"</code> - Override the default title</li>
            <li><code>class="custom-class"</code> - Add custom CSS classes</li>
        </ul>
        
        <h3>Examples:</h3>
        <pre><code>[percentage_calculator title="Calculate Percentages" class="my-custom-style"]</code></pre>
        <pre><code>[calculator_tools_list columns="4" class="tools-grid"]</code></pre>
        
        <h2 style="margin-top: 40px;">Installation & Usage</h2>
        <ol>
            <li>Copy any shortcode from above</li>
            <li>Paste it into any post, page, or widget where you want the calculator to appear</li>
            <li>Save and view your content - the calculator will be displayed automatically</li>
        </ol>
        
        <div class="notice notice-info">
            <p><strong>Note:</strong> All calculators are fully responsive and will work on desktop, tablet, and mobile devices.</p>
        </div>
        
        <div class="notice notice-success">
            <p><strong>Pro Tip:</strong> You can use multiple calculators on the same page by using different shortcodes.</p>
        </div>
    </div>
</div>

<style>
.postbox {
    background: #fff;
    border: 1px solid #ccd0d4;
    border-radius: 4px;
    margin-bottom: 20px;
}

.postbox h3 {
    background: #f1f1f1;
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #ccd0d4;
    font-size: 14px;
    font-weight: 600;
}

.postbox .inside {
    padding: 15px;
}

.postbox code {
    background: #f1f1f1;
    padding: 4px 8px;
    border-radius: 3px;
    font-family: Consolas, Monaco, monospace;
    font-size: 13px;
    color: #d63384;
}

.postbox p {
    margin: 10px 0 0 0;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
}

.postbox ul {
    margin: 10px 0 0 20px;
    color: #666;
    font-size: 13px;
}

pre {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    overflow-x: auto;
    margin: 10px 0;
}

pre code {
    background: none !important;
    color: #495057 !important;
    padding: 0 !important;
}
</style>