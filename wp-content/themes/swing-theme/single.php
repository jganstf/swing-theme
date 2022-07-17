<?php get_header();

$option_fields = get_fields('options');
$image_cta = $option_fields['image_based_cta'];

$related_posts = get_posts(
    [
        'category__in' => wp_get_post_categories($post->ID),
        'numberposts' => 3,
        'post__not_in' => array($post->ID)
    ]
);
print_r($related);

?>
<main id="main_content" class="main-content-wrap">
    <div class="main">
        <div class="breadcrumb"><?php get_breadcrumb(); ?></div>
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <div class="single-post--banner">
                    <div class="inner-wrap">
                        <div class="single-post--banner-img">
                            <?php echo get_the_post_thumbnail(); ?>
                        </div>
                        <div class="single-post--banner-info">
                            <span><?php echo get_the_date("M d, Y"); ?></span>
                            <h2><?php echo get_the_title(); ?></h2>
                            <span><?php echo get_the_author(); ?></span>
                        </div>
                    </div>
                </div>
                <div class="single-post--content">
                    <div class="inner-wrap">
                        <div class="social-share">
                            <div class="social-share--inner sticky">
                                <p>Share</p>
                                <div class="d-flex social-share--list">
                                    <a href="<?php echo social_share('twitter'); ?>" class="social-icon">
                                        <?php insert_svg('twitter'); ?>
                                    </a>
                                    <a href="<?php echo social_share('facebook'); ?>" class="social-icon">
                                        <?php insert_svg('facebook'); ?>
                                    </a>
                                    <a href="<?php echo social_share('linkedin'); ?>" class="social-icon">
                                        <?php insert_svg('linkedin'); ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="single-post--content-wrap">
                            <?php the_content(); ?>
                        </div>
                        <div class="single-post--content-sidebar">
                            <div class="sidebar-inner sticky">
                                <div class="sidebar-subcribe">
                                    <h4>Subscribe for More Content</h4>
                                    <form>
                                        <div class="subscribe-email">
                                            <input type="text" placeholder="Enter Your Email">
                                        </div>
                                        <div class="btn-wrap">
                                            <div class="btn"><a href="#0">Subscribe</a></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="sidebar-cta">
                                    <div class="sidebar-cta--img">
                                        <img src="<?php echo $image_cta['image']; ?>" />
                                    </div>
                                    <div class="sidebar-cta--info">
                                        <h3><?php echo $image_cta['cta_title']; ?></h3>
                                        <p><?php echo $image_cta['cta_text']; ?></p>
                                        <div class="btn-wrap">
                                            <div class="btn"><a href="<?php echo $image_cta['cta_button']['url']; ?>" target="<?php echo $image_cta['cta_button']['target']; ?>"><?php echo $image_cta['cta_button']['title']; ?></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endwhile;
        else : ?>
            <p><?php esc_html_e('Sorry, no posts matched your criteria.'); ?></p>
        <?php endif;
        if (!empty($related_posts)) { ?>
            <div class="related-posts">
                <div class="inner-wrap">
                    <div class="related-posts--title">
                        <h2>
                            Related Articles
                        </h2>
                    </div>
                    <div class="post-cards--grid">
                        <ul class="post-cards--grid-inner">
                            <?php foreach ($related_posts as $related_post) {
                                $category = implode(',', wp_get_post_terms($related_post->ID, 'category', ['fields' => 'names'])); ?>
                                <li class="post-cards--grid-wrap">
                                    <div class="post-cards--grid-item">
                                        <figure>
                                            <?php echo get_the_post_thumbnail($related_post->ID); ?>
                                        </figure>
                                        <div class="post-info">
                                            <small>
                                                <?php echo date("M d, Y", strtotime($related->post_date)); ?>
                                            </small>
                                            <h3><?php echo $related->post_title; ?></h3>
                                            <small><?php echo $category; ?></small>
                                            <a href="<?php echo get_the_permalink($related_post->ID); ?>">LEARN MORE</a>
                                        </div>
                                    </div>

                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
</main>

<?php get_footer(); ?>