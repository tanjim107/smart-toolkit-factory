<?php
/**
 * Template Name: Tools List
 */

get_header();
?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-tool-container">
            <h1 class="ct-tool-title">All Calculator Tools</h1>
            <p class="ct-tool-description">Choose from our collection of powerful calculation and utility tools</p>

            <div class="ct-grid ct-grid-3">
                <?php
                $tools = calculator_tools_get_tools();
                foreach ($tools as $tool) :
                ?>
                    <a href="<?php echo esc_url(home_url('/' . $tool['slug'])); ?>" class="ct-tool-card">
                        <div class="ct-tool-icon"><?php echo $tool['icon']; ?></div>
                        <h3><?php echo esc_html($tool['name']); ?></h3>
                        <p><?php echo esc_html($tool['description']); ?></p>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
