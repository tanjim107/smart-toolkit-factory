<?php get_header(); ?>

<main class="ct-main-content">
    <div class="ct-container">
        <div class="ct-hero">
            <h1 class="ct-hero-title">Welcome to Calculator Tools</h1>
            <p class="ct-hero-subtitle">Your collection of powerful calculation and utility tools</p>
        </div>

        <?php if (have_posts()) : ?>
            <div class="ct-posts-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('ct-post-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="ct-post-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="ct-post-content">
                            <h2 class="ct-post-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <div class="ct-post-excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                            <a href="<?php the_permalink(); ?>" class="ct-btn ct-btn-primary">Read More</a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <div class="ct-no-content">
                <h2>No content found</h2>
                <p>Try creating some pages or posts to get started!</p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
