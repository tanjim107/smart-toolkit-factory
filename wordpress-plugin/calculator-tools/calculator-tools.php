<?php
/*
Plugin Name: Calculator Tools
Plugin URI: https://yourwebsite.com
Description: A comprehensive collection of calculators and tools including percentage calculator, GST calculator, EMI calculator, password generator, QR code generator, and more.
Version: 1.0.0
Author: Your Name
Author URI: https://yourwebsite.com
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: calculator-tools
Domain Path: /languages
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CALC_TOOLS_VERSION', '1.0.0');
define('CALC_TOOLS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CALC_TOOLS_PLUGIN_PATH', plugin_dir_path(__FILE__));

class CalculatorTools {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    public function init() {
        // Register shortcodes
        add_shortcode('percentage_calculator', array($this, 'percentage_calculator_shortcode'));
        add_shortcode('gst_calculator', array($this, 'gst_calculator_shortcode'));
        add_shortcode('emi_calculator', array($this, 'emi_calculator_shortcode'));
        add_shortcode('password_generator', array($this, 'password_generator_shortcode'));
        add_shortcode('qr_code_generator', array($this, 'qr_code_generator_shortcode'));
        add_shortcode('word_counter', array($this, 'word_counter_shortcode'));
        add_shortcode('age_calculator', array($this, 'age_calculator_shortcode'));
        add_shortcode('date_difference', array($this, 'date_difference_shortcode'));
        add_shortcode('profit_loss', array($this, 'profit_loss_shortcode'));
        add_shortcode('area_calculator', array($this, 'area_calculator_shortcode'));
        add_shortcode('ecommerce_profit', array($this, 'ecommerce_profit_shortcode'));
        add_shortcode('gmail_generator', array($this, 'gmail_generator_shortcode'));
        add_shortcode('image_converter', array($this, 'image_converter_shortcode'));
        add_shortcode('image_compressor', array($this, 'image_compressor_shortcode'));
        add_shortcode('image_to_qr', array($this, 'image_to_qr_shortcode'));
        add_shortcode('calculator_tools_list', array($this, 'tools_list_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_calc_tools_calculate', array($this, 'handle_ajax_calculate'));
        add_action('wp_ajax_nopriv_calc_tools_calculate', array($this, 'handle_ajax_calculate'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('calc-tools-style', CALC_TOOLS_PLUGIN_URL . 'assets/style.css', array(), CALC_TOOLS_VERSION);
        wp_enqueue_script('calc-tools-script', CALC_TOOLS_PLUGIN_URL . 'assets/script.js', array('jquery'), CALC_TOOLS_VERSION, true);
        
        // Localize script for AJAX
        wp_localize_script('calc-tools-script', 'calc_tools_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('calc_tools_nonce')
        ));
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Calculator Tools',
            'Calculator Tools',
            'manage_options',
            'calculator-tools',
            array($this, 'admin_page'),
            'dashicons-calculator',
            30
        );
    }
    
    public function admin_page() {
        include CALC_TOOLS_PLUGIN_PATH . 'includes/admin-page.php';
    }
    
    // Shortcode handlers
    public function percentage_calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Percentage Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/percentage-calculator.php';
        return ob_get_clean();
    }
    
    public function gst_calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'GST Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/gst-calculator.php';
        return ob_get_clean();
    }
    
    public function emi_calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'EMI Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/emi-calculator.php';
        return ob_get_clean();
    }
    
    public function password_generator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Password Generator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/password-generator.php';
        return ob_get_clean();
    }
    
    public function qr_code_generator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'QR Code Generator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/qr-code-generator.php';
        return ob_get_clean();
    }
    
    public function word_counter_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Word Counter',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/word-counter.php';
        return ob_get_clean();
    }
    
    public function age_calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Age Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/age-calculator.php';
        return ob_get_clean();
    }
    
    public function date_difference_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Date Difference Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/date-difference.php';
        return ob_get_clean();
    }
    
    public function profit_loss_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Profit Loss Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/profit-loss.php';
        return ob_get_clean();
    }
    
    public function area_calculator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Area Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/area-calculator.php';
        return ob_get_clean();
    }
    
    public function ecommerce_profit_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'eCommerce Profit Calculator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/ecommerce-profit.php';
        return ob_get_clean();
    }
    
    public function gmail_generator_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Gmail Generator',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/gmail-generator.php';
        return ob_get_clean();
    }
    
    public function image_converter_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Image Converter',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/image-converter.php';
        return ob_get_clean();
    }
    
    public function image_compressor_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Image Compressor',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/image-compressor.php';
        return ob_get_clean();
    }
    
    public function image_to_qr_shortcode($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Image to QR Code',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools/image-to-qr.php';
        return ob_get_clean();
    }
    
    public function tools_list_shortcode($atts) {
        $atts = shortcode_atts(array(
            'columns' => '3',
            'class' => ''
        ), $atts);
        
        ob_start();
        include CALC_TOOLS_PLUGIN_PATH . 'includes/tools-list.php';
        return ob_get_clean();
    }
    
    public function handle_ajax_calculate() {
        check_ajax_referer('calc_tools_nonce', 'nonce');
        
        $tool_type = sanitize_text_field($_POST['tool_type']);
        $data = array_map('sanitize_text_field', $_POST['data']);
        
        switch($tool_type) {
            case 'percentage':
                $this->calculate_percentage($data);
                break;
            case 'gst':
                $this->calculate_gst($data);
                break;
            case 'emi':
                $this->calculate_emi($data);
                break;
            case 'profit_loss':
                $this->calculate_profit_loss($data);
                break;
            case 'age':
                $this->calculate_age($data);
                break;
            default:
                wp_send_json_error('Invalid tool type');
        }
    }
    
    private function calculate_percentage($data) {
        $calc_type = $data['calc_type'];
        
        switch($calc_type) {
            case 'find':
                $value = floatval($data['value']);
                $percent = floatval($data['percent']);
                $result = ($value * $percent) / 100;
                wp_send_json_success(array(
                    'result' => number_format($result, 2),
                    'formula' => "$percent% of $value is " . number_format($result, 2)
                ));
                break;
                
            case 'calculate':
                $part = floatval($data['part']);
                $total = floatval($data['total']);
                if ($total == 0) {
                    wp_send_json_error('Total cannot be zero');
                }
                $result = ($part / $total) * 100;
                wp_send_json_success(array(
                    'result' => number_format($result, 2) . '%',
                    'formula' => "$part is " . number_format($result, 2) . "% of $total"
                ));
                break;
                
            case 'value':
                $known_value = floatval($data['known_value']);
                $known_percent = floatval($data['known_percent']);
                if ($known_percent == 0) {
                    wp_send_json_error('Percentage cannot be zero');
                }
                $result = ($known_value * 100) / $known_percent;
                wp_send_json_success(array(
                    'result' => number_format($result, 2),
                    'formula' => "$known_value is $known_percent% of " . number_format($result, 2)
                ));
                break;
        }
    }
    
    private function calculate_gst($data) {
        $calc_type = $data['calc_type'];
        $amount = floatval($data['amount']);
        $gst_rate = floatval($data['gst_rate']);
        
        if ($calc_type === 'add') {
            $gst_amount = ($amount * $gst_rate) / 100;
            $total_amount = $amount + $gst_amount;
            wp_send_json_success(array(
                'net_amount' => number_format($amount, 2),
                'gst_amount' => number_format($gst_amount, 2),
                'total_amount' => number_format($total_amount, 2)
            ));
        } else {
            $net_amount = $amount / (1 + $gst_rate / 100);
            $gst_amount = $amount - $net_amount;
            wp_send_json_success(array(
                'net_amount' => number_format($net_amount, 2),
                'gst_amount' => number_format($gst_amount, 2),
                'total_amount' => number_format($amount, 2)
            ));
        }
    }
    
    private function calculate_emi($data) {
        $principal = floatval($data['principal']);
        $rate = floatval($data['rate']) / 100 / 12; // Monthly rate
        $tenure = intval($data['tenure']);
        
        if ($rate > 0) {
            $emi = ($principal * $rate * pow(1 + $rate, $tenure)) / (pow(1 + $rate, $tenure) - 1);
        } else {
            $emi = $principal / $tenure;
        }
        
        $total_amount = $emi * $tenure;
        $total_interest = $total_amount - $principal;
        
        wp_send_json_success(array(
            'emi' => number_format($emi, 2),
            'total_amount' => number_format($total_amount, 2),
            'total_interest' => number_format($total_interest, 2)
        ));
    }
    
    private function calculate_profit_loss($data) {
        $cost_price = floatval($data['cost_price']);
        $selling_price = floatval($data['selling_price']);
        
        $difference = $selling_price - $cost_price;
        $percentage = ($difference / $cost_price) * 100;
        
        $type = $difference >= 0 ? 'profit' : 'loss';
        
        wp_send_json_success(array(
            'type' => $type,
            'amount' => number_format(abs($difference), 2),
            'percentage' => number_format(abs($percentage), 2),
            'cost_price' => number_format($cost_price, 2),
            'selling_price' => number_format($selling_price, 2)
        ));
    }
    
    private function calculate_age($data) {
        $birth_date = $data['birth_date'];
        $current_date = date('Y-m-d');
        
        $birth = new DateTime($birth_date);
        $today = new DateTime($current_date);
        $interval = $birth->diff($today);
        
        wp_send_json_success(array(
            'years' => $interval->y,
            'months' => $interval->m,
            'days' => $interval->d,
            'total_days' => $interval->days,
            'total_weeks' => floor($interval->days / 7),
            'total_months' => ($interval->y * 12) + $interval->m
        ));
    }
}

// Initialize the plugin
new CalculatorTools();

// Activation hook
register_activation_hook(__FILE__, 'calc_tools_activate');
function calc_tools_activate() {
    // Create necessary database tables or options
    add_option('calc_tools_version', CALC_TOOLS_VERSION);
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'calc_tools_deactivate');
function calc_tools_deactivate() {
    // Cleanup if needed
}
?>