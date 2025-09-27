=== Calculator Tools ===
Contributors: yourname
Tags: calculator, tools, percentage, gst, emi, password, qr-code, word-counter
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A comprehensive collection of calculators and utility tools for WordPress including percentage calculator, GST calculator, EMI calculator, password generator, QR code generator, and more.

== Description ==

Calculator Tools is a powerful WordPress plugin that provides a complete suite of calculators and utility tools through easy-to-use shortcodes. Perfect for financial websites, educational platforms, business sites, and any website that needs interactive calculation tools.

### 🧮 Available Tools

**Financial Calculators:**
* **Percentage Calculator** - Calculate percentages with three different methods
* **GST Calculator** - Add or remove GST with all Indian tax rates
* **EMI Calculator** - Calculate loan EMIs with detailed breakdowns
* **Profit Loss Calculator** - Determine profit/loss from cost and selling price
* **eCommerce Profit Calculator** - Calculate online store profitability
* **Area Calculator** - Calculate areas of various geometric shapes

**Utility Tools:**
* **Password Generator** - Create secure passwords with customizable options
* **QR Code Generator** - Generate QR codes for text, URLs, emails, phone numbers
* **Word Counter** - Count words, characters, sentences, and paragraphs
* **Age Calculator** - Calculate precise age from birthdate
* **Date Difference Calculator** - Find differences between two dates
* **Gmail Generator** - Generate multiple Gmail address variations
* **Image Converter** - Convert images between different formats
* **Image Compressor** - Compress images while maintaining quality
* **Image to QR Code** - Convert uploaded images into QR codes

### ✨ Key Features

* **Easy Integration** - Simple shortcodes for any post, page, or widget
* **Responsive Design** - Works perfectly on all devices and screen sizes
* **Professional Styling** - Beautiful, modern interface that matches any theme
* **Real-time Calculations** - Instant results with smooth animations
* **AJAX-Powered** - Fast calculations without page reloads
* **Input Validation** - Comprehensive error checking and user guidance
* **Copy to Clipboard** - Easy copying of results and generated content
* **Multiple Input Methods** - Support for various data entry formats
* **Accessibility Ready** - Screen reader friendly and keyboard navigable

### 🚀 Quick Start

1. Install and activate the plugin
2. Use any shortcode in your content: `[percentage_calculator]`
3. Your calculator appears automatically - that's it!

### 📋 Available Shortcodes

```
[percentage_calculator]     - Percentage Calculator
[gst_calculator]           - GST Calculator  
[emi_calculator]           - EMI Calculator
[password_generator]       - Password Generator
[qr_code_generator]        - QR Code Generator
[word_counter]             - Word Counter
[age_calculator]           - Age Calculator
[date_difference]          - Date Difference Calculator
[profit_loss]              - Profit Loss Calculator
[area_calculator]          - Area Calculator
[ecommerce_profit]         - eCommerce Profit Calculator
[gmail_generator]          - Gmail Generator
[image_converter]          - Image Converter
[image_compressor]         - Image Compressor
[image_to_qr]              - Image to QR Code
[calculator_tools_list]    - Complete tools listing
```

### 🎨 Customization Options

All shortcodes support these attributes:
* `title="Custom Title"` - Override the default title
* `class="custom-class"` - Add custom CSS classes

Example: `[percentage_calculator title="Calculate Percentages" class="my-style"]`

### 🔧 Technical Details

* **Built with Modern Standards** - Clean, semantic HTML5 and CSS3
* **jQuery Integration** - Smooth interactions and animations
* **AJAX Support** - Real-time calculations without page refresh
* **Security First** - Proper input sanitization and validation
* **Performance Optimized** - Lightweight and fast loading
* **Cross-Browser Compatible** - Works in all modern browsers
* **Mobile First** - Responsive design for all devices

### 💼 Perfect For

* Financial and banking websites
* Educational institutions and e-learning platforms
* Business and corporate websites
* Real estate and mortgage sites
* E-commerce and retail platforms
* Tools and utility websites
* Personal blogs and portfolios

### 🌟 Pro Features Coming Soon

* Custom color schemes and themes
* Advanced calculation formulas
* Export results to PDF/Excel
* User calculation history
* Integration with popular form builders
* White-label options

== Installation ==

### Automatic Installation

1. Log in to your WordPress admin panel
2. Go to Plugins > Add New
3. Search for "Calculator Tools"
4. Click "Install Now" and then "Activate"

### Manual Installation

1. Download the plugin ZIP file
2. Go to Plugins > Add New > Upload Plugin
3. Choose the ZIP file and click "Install Now"
4. Activate the plugin

### After Installation

1. Go to Calculator Tools in your admin menu to see all available shortcodes
2. Copy any shortcode and paste it into your content
3. Save your post/page and view the calculator in action

== Frequently Asked Questions ==

= How do I add a calculator to my page? =

Simply add the appropriate shortcode to your content. For example, add `[percentage_calculator]` to display the percentage calculator.

= Can I use multiple calculators on the same page? =

Yes! You can use as many different calculators as you want on the same page.

= Are the calculators mobile-friendly? =

Absolutely! All calculators are fully responsive and work perfectly on mobile devices, tablets, and desktops.

= Can I customize the appearance? =

Yes, you can add custom CSS classes using the `class` attribute in the shortcode and style them with your theme's CSS.

= Do the calculators work without JavaScript? =

The calculators require JavaScript for interactive functionality. They will display a basic form without JavaScript, but calculations require JS to be enabled.

= Are there any premium features? =

Currently, all features are free. We're working on pro features like custom themes, advanced formulas, and export options.

= Can I suggest new calculator types? =

Absolutely! We'd love to hear your suggestions. Please contact us through the plugin support page.

= Is the plugin translation ready? =

Yes, the plugin is translation ready and includes a .pot file for translators.

== Screenshots ==

1. Percentage Calculator with three calculation methods
2. GST Calculator with Indian tax rates
3. Password Generator with security options
4. QR Code Generator with multiple content types
5. Word Counter with detailed statistics
6. Admin page showing all available shortcodes
7. Mobile responsive design
8. Tools listing page

== Changelog ==

= 1.0.0 =
* Initial release
* 15 different calculators and tools
* Complete shortcode integration
* Responsive design
* AJAX-powered calculations
* Input validation and error handling
* Copy to clipboard functionality
* Professional admin interface

== Upgrade Notice ==

= 1.0.0 =
Initial release of Calculator Tools plugin with 15 powerful calculators and utility tools.

== Developer Information ==

### Hooks and Filters

The plugin provides several hooks for developers:

**Actions:**
* `calc_tools_before_calculator` - Fires before calculator output
* `calc_tools_after_calculator` - Fires after calculator output

**Filters:**
* `calc_tools_calculator_args` - Filter calculator arguments
* `calc_tools_calculator_output` - Filter calculator HTML output

### Custom Styling

Add custom styles by targeting these CSS classes:
* `.calc-tools-container` - Main container
* `.calc-form` - Form elements
* `.calc-result` - Result display
* `.calc-btn` - Buttons

### AJAX Endpoints

The plugin registers these AJAX actions:
* `calc_tools_calculate` - Main calculation handler

== Support ==

For support, feature requests, or bug reports, please visit our support page or contact us directly.

**Documentation:** [Plugin Documentation](https://yourwebsite.com/docs)
**Support Forum:** [WordPress.org Support](https://wordpress.org/support/plugin/calculator-tools)
**GitHub:** [Source Code](https://github.com/yourname/calculator-tools)

== Credits ==

* QR Code generation powered by QR Server API
* Icons from Lucide React icon library
* Responsive design inspired by modern web standards