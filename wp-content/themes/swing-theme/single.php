<?php get_header();

$option_fields = get_fields('options');
$image_cta = $option_fields['image_based_cta'];

?>
<main id="main_content" class="main-content-wrap">
    <div class="main">
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
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>