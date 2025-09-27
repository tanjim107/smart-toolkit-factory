/* Calculator Tools Plugin JavaScript */
(function($) {
    'use strict';

    // Main Calculator Tools Object
    const CalcTools = {
        init: function() {
            this.bindEvents();
            this.initializeTabs();
            this.initializePasswordGenerator();
            this.initializeWordCounter();
        },

        bindEvents: function() {
            // Form submissions
            $(document).on('submit', '.calc-form', this.handleFormSubmit);
            
            // Tab switching
            $(document).on('click', '.calc-tab-trigger', this.switchTab);
            
            // Copy to clipboard
            $(document).on('click', '.copy-btn', this.copyToClipboard);
            
            // Password generator controls
            $(document).on('input', '.password-length-slider', this.updatePasswordLength);
            $(document).on('change', '.password-options input', this.generatePassword);
            $(document).on('click', '.generate-password-btn', this.generatePassword);
            
            // Word counter
            $(document).on('input', '.word-counter-textarea', this.updateWordCount);
            $(document).on('click', '.clear-text-btn', this.clearText);
            
            // File upload handlers
            $(document).on('change', '.file-upload', this.handleFileUpload);
        },

        initializeTabs: function() {
            $('.calc-tabs').each(function() {
                const $tabs = $(this);
                const $triggers = $tabs.find('.calc-tab-trigger');
                const $contents = $tabs.find('.calc-tab-content');
                
                // Show first tab by default
                $triggers.first().addClass('active');
                $contents.first().addClass('active');
            });
        },

        switchTab: function(e) {
            e.preventDefault();
            const $trigger = $(this);
            const $tabs = $trigger.closest('.calc-tabs');
            const target = $trigger.data('target');
            
            // Update active trigger
            $tabs.find('.calc-tab-trigger').removeClass('active');
            $trigger.addClass('active');
            
            // Update active content
            $tabs.find('.calc-tab-content').removeClass('active');
            $tabs.find('[data-tab="' + target + '"]').addClass('active');
        },

        handleFormSubmit: function(e) {
            e.preventDefault();
            const $form = $(this);
            const toolType = $form.data('tool');
            const $submitBtn = $form.find('[type="submit"]');
            const originalText = $submitBtn.text();
            
            // Show loading state
            $submitBtn.html('<span class="calc-loading"></span> Calculating...').prop('disabled', true);
            
            // Collect form data
            const formData = {};
            $form.find('input, select, textarea').each(function() {
                const $field = $(this);
                const name = $field.attr('name');
                const value = $field.val();
                if (name) {
                    formData[name] = value;
                }
            });
            
            // Make AJAX request
            $.ajax({
                url: calc_tools_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'calc_tools_calculate',
                    nonce: calc_tools_ajax.nonce,
                    tool_type: toolType,
                    data: formData
                },
                success: function(response) {
                    if (response.success) {
                        CalcTools.displayResult($form, response.data);
                        CalcTools.clearErrors($form);
                    } else {
                        CalcTools.displayError($form, response.data);
                    }
                },
                error: function() {
                    CalcTools.displayError($form, 'An error occurred. Please try again.');
                },
                complete: function() {
                    $submitBtn.text(originalText).prop('disabled', false);
                }
            });
        },

        displayResult: function($form, data) {
            const $container = $form.closest('.calc-tools-container');
            let $result = $container.find('.calc-result');
            
            if ($result.length === 0) {
                $result = $('<div class="calc-result"></div>');
                $form.after($result);
            }
            
            // Build result HTML based on tool type
            const toolType = $form.data('tool');
            let resultHTML = '';
            
            switch(toolType) {
                case 'percentage':
                    resultHTML = this.buildPercentageResult(data);
                    break;
                case 'gst':
                    resultHTML = this.buildGSTResult(data);
                    break;
                case 'emi':
                    resultHTML = this.buildEMIResult(data);
                    break;
                case 'profit_loss':
                    resultHTML = this.buildProfitLossResult(data);
                    break;
                case 'age':
                    resultHTML = this.buildAgeResult(data);
                    break;
                default:
                    resultHTML = '<div class="calc-result-value">' + JSON.stringify(data) + '</div>';
            }
            
            $result.html(resultHTML).show();
        },

        buildPercentageResult: function(data) {
            return `
                <div class="calc-result-title">Result</div>
                <div class="calc-result-value">${data.result}</div>
                <div class="calc-result-description">${data.formula}</div>
            `;
        },

        buildGSTResult: function(data) {
            return `
                <div class="calc-result-title">GST Calculation Result</div>
                <div class="calc-result-grid">
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Net Amount</div>
                        <div class="calc-result-item-value">₹${data.net_amount}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">GST Amount</div>
                        <div class="calc-result-item-value">₹${data.gst_amount}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Amount</div>
                        <div class="calc-result-item-value">₹${data.total_amount}</div>
                    </div>
                </div>
            `;
        },

        buildEMIResult: function(data) {
            return `
                <div class="calc-result-title">EMI Calculation Result</div>
                <div class="calc-result-grid">
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Monthly EMI</div>
                        <div class="calc-result-item-value">₹${data.emi}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Amount</div>
                        <div class="calc-result-item-value">₹${data.total_amount}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Interest</div>
                        <div class="calc-result-item-value">₹${data.total_interest}</div>
                    </div>
                </div>
            `;
        },

        buildProfitLossResult: function(data) {
            const typeClass = data.type === 'profit' ? 'success' : 'danger';
            const typeLabel = data.type === 'profit' ? 'Profit' : 'Loss';
            
            return `
                <div class="calc-result-title">${typeLabel} Calculation Result</div>
                <div class="calc-result-value calc-result-${typeClass}">₹${data.amount}</div>
                <div class="calc-result-description">${data.percentage}% ${typeLabel}</div>
                <div class="calc-result-grid">
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Cost Price</div>
                        <div class="calc-result-item-value">₹${data.cost_price}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Selling Price</div>
                        <div class="calc-result-item-value">₹${data.selling_price}</div>
                    </div>
                </div>
            `;
        },

        buildAgeResult: function(data) {
            return `
                <div class="calc-result-title">Age Calculation Result</div>
                <div class="calc-result-value">${data.years} Years, ${data.months} Months, ${data.days} Days</div>
                <div class="calc-result-grid">
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Days</div>
                        <div class="calc-result-item-value">${data.total_days}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Weeks</div>
                        <div class="calc-result-item-value">${data.total_weeks}</div>
                    </div>
                    <div class="calc-result-item">
                        <div class="calc-result-item-label">Total Months</div>
                        <div class="calc-result-item-value">${data.total_months}</div>
                    </div>
                </div>
            `;
        },

        displayError: function($form, message) {
            this.clearErrors($form);
            const $error = $('<div class="calc-error">' + message + '</div>');
            $form.after($error);
        },

        clearErrors: function($form) {
            $form.siblings('.calc-error').remove();
        },

        copyToClipboard: function(e) {
            e.preventDefault();
            const $btn = $(this);
            const text = $btn.data('text') || $btn.prev('input, textarea').val();
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    CalcTools.showCopySuccess($btn);
                });
            } else {
                // Fallback for older browsers
                const $temp = $('<textarea>');
                $('body').append($temp);
                $temp.val(text).select();
                document.execCommand('copy');
                $temp.remove();
                CalcTools.showCopySuccess($btn);
            }
        },

        showCopySuccess: function($btn) {
            const originalText = $btn.text();
            $btn.text('Copied!').addClass('calc-btn-success');
            setTimeout(function() {
                $btn.text(originalText).removeClass('calc-btn-success');
            }, 2000);
        },

        // Password Generator Functions
        initializePasswordGenerator: function() {
            this.generatePassword();
        },

        updatePasswordLength: function() {
            const $slider = $(this);
            const length = $slider.val();
            $slider.next('.password-length-display').text(length + ' characters');
            CalcTools.generatePassword();
        },

        generatePassword: function() {
            const $container = $('.password-generator-container');
            if ($container.length === 0) return;
            
            const length = parseInt($container.find('.password-length-slider').val()) || 12;
            const uppercase = $container.find('.include-uppercase').prop('checked');
            const lowercase = $container.find('.include-lowercase').prop('checked');
            const numbers = $container.find('.include-numbers').prop('checked');
            const symbols = $container.find('.include-symbols').prop('checked');
            
            let charset = '';
            if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (numbers) charset += '0123456789';
            if (symbols) charset += '!@#$%^&*()_+[]{}|;:,.<>?';
            
            if (charset === '') {
                charset = 'abcdefghijklmnopqrstuvwxyz'; // Default to lowercase
            }
            
            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            
            $container.find('.password-display').text(password);
            this.evaluatePasswordStrength(password);
        },

        evaluatePasswordStrength: function(password) {
            let score = 0;
            
            if (password.length >= 8) score++;
            if (password.length >= 12) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[a-z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;
            
            const uniqueChars = new Set(password.split('')).size;
            if (uniqueChars > password.length * 0.6) score++;
            
            let strength = 'weak';
            if (score >= 7) strength = 'very-strong';
            else if (score >= 5) strength = 'strong';
            else if (score >= 3) strength = 'moderate';
            
            const $strengthBar = $('.password-strength-bar');
            $strengthBar.removeClass('weak moderate strong very-strong').addClass(strength);
            $('.password-strength-label').text(strength.replace('-', ' ').toUpperCase());
        },

        // Word Counter Functions
        updateWordCount: function() {
            const $textarea = $(this);
            const text = $textarea.val();
            const $container = $textarea.closest('.word-counter-container');
            
            // Calculate statistics
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            const characters = text.length;
            const charactersNoSpaces = text.replace(/\s/g, '').length;
            const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
            const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
            const lines = text.split('\n').length;
            const readingTime = Math.ceil(words / 200); // Assuming 200 WPM
            
            // Update display
            $container.find('.word-count').text(words);
            $container.find('.character-count').text(characters);
            $container.find('.character-count-no-spaces').text(charactersNoSpaces);
            $container.find('.sentence-count').text(sentences);
            $container.find('.paragraph-count').text(paragraphs);
            $container.find('.line-count').text(lines);
            $container.find('.reading-time').text(readingTime);
            
            // Show/hide stats
            if (text.trim().length > 0) {
                $container.find('.word-stats').show();
            } else {
                $container.find('.word-stats').hide();
            }
        },

        clearText: function(e) {
            e.preventDefault();
            const $btn = $(this);
            const $container = $btn.closest('.word-counter-container');
            $container.find('.word-counter-textarea').val('').trigger('input');
        },

        // File Upload Handler
        handleFileUpload: function() {
            const $input = $(this);
            const file = this.files[0];
            const $container = $input.closest('.calc-tools-container');
            
            if (file) {
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                
                $container.find('.file-info').html(`
                    <div class="calc-success">
                        File selected: ${fileName} (${fileSize})
                    </div>
                `);
                
                // For image tools, show preview
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        $container.find('.image-preview').html(`
                            <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
                        `);
                    };
                    reader.readAsDataURL(file);
                }
            }
        },

        // QR Code Generator
        generateQRCode: function(text, size = 200) {
            const encodedText = encodeURIComponent(text);
            return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
        },

        updateQRCode: function($container) {
            const text = $container.find('.qr-text-input').val();
            const size = $container.find('.qr-size-select').val() || 200;
            
            if (text.trim()) {
                const qrUrl = this.generateQRCode(text, size);
                $container.find('.qr-code-display').html(`
                    <div class="qr-code-container">
                        <img src="${qrUrl}" alt="QR Code" class="qr-code-image">
                        <div style="margin-top: 10px;">
                            <a href="${qrUrl}" download="qrcode.png" class="calc-btn calc-btn-primary">Download QR Code</a>
                        </div>
                    </div>
                `);
            } else {
                $container.find('.qr-code-display').html('<div class="calc-error">Please enter text to generate QR code</div>');
            }
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        CalcTools.init();
    });

    // Make CalcTools globally available
    window.CalcTools = CalcTools;

})(jQuery);