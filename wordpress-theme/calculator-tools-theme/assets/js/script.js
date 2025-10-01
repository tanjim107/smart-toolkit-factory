/* Calculator Tools Theme JavaScript */

(function($) {
    'use strict';

    // Mobile menu toggle
    $('.ct-mobile-toggle').on('click', function() {
        $('.ct-nav').slideToggle();
    });

    // Tab functionality
    $('.ct-tab-button').on('click', function() {
        const tabId = $(this).data('tab');
        
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        $('.ct-tab-content').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // Number formatting
    window.formatCurrency = function(value) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    window.formatNumber = function(value, decimals = 2) {
        return parseFloat(value).toFixed(decimals);
    };

    // Copy to clipboard
    window.copyToClipboard = function(text, buttonId) {
        navigator.clipboard.writeText(text).then(function() {
            const btn = document.getElementById(buttonId);
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Copied!';
            setTimeout(function() {
                btn.innerHTML = originalText;
            }, 2000);
        });
    };

    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });

})(jQuery);
