<footer class="ct-footer">
    <div class="ct-container">
        <div class="ct-footer-content">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'menu_class' => 'ct-footer-menu',
                'container' => false,
                'fallback_cb' => false,
            ));
            ?>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
