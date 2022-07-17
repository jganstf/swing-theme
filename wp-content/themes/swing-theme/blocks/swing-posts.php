<?php

$parent_cat = get_field('post_category');

$child_cats = get_categories(['parent' => $parent_cat]);

$sticky = get_option('sticky_posts');

$args = array(
    'cat' => $parent_cat,
    'ignore_sticky_posts' => 0,
    'post__in' => $sticky,
);

$sticky_posts = get_posts($args);

$latest_posts = get_posts(
    [
        'posts_per_page' => 6,
        'cat' => $parent_cat,
        'post__not_in' => [$sticky_posts[0]->ID]
    ]
);

if (!empty($child_cats)) { ?>
    <div class="post-filter">
        <form action="<?php get_the_permalink(); ?>">
            <div class="cat-nav">
                <ul>
                    <li>
                        <button type="submit" name="post-cat" value="" class="filter-button">
                            Browse All
                        </button>
                    </li>
                    <?php foreach ($child_cats as $child_cat) { ?>
                        <li>
                            <button type="submit" name="post-cat" value="<?php echo $child_cat->slug; ?>" class="filter-button">
                                <?php echo $child_cat->name; ?>
                            </button>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </form>
    </div>
<?php
}

if (!empty($sticky_posts)) { ?>
    <div class="featured-posts">
        <div class="inner-wrap">
            <div class="inner-banner">
                <div class="inner-banner-img">
                    <?php echo get_the_post_thumbnail($sticky_posts[0]->ID); ?>
                </div>
                <div class="inner-banner-content">
                    <span><?php echo date("M d, Y", strtotime($sticky_posts[0]->post_date)); ?></span>
                    <h3><?php echo $sticky_posts[0]->post_title; ?></h3>
                    <p><?php echo $sticky_posts[0]->post_content; ?></p>
                    <a href="<?php echo get_the_permalink($sticky_posts[0]->ID); ?>">LEARN MORE</a>
                </div>
            </div>
        </div>
    </div>
<?php
}
?>

<div class="latest-posts">
    <div class="inner-wrap">
        <h2>Latest & Trending</h2>
        <div class="latest-posts--list">
            <ul>
                <?php foreach ($latest_posts as $latest_post) {
                    $category = implode(',', wp_get_post_terms($latest_post->ID, 'category', ['fields' => 'names']));
                ?>
                    <li>
                        <div class="latest-posts--list-item">
                            <figure>
                                <?php echo get_the_post_thumbnail($latest_post->ID); ?>
                            </figure>
                            <div class="post-info">
                                <small>
                                    <?php echo date("M d, Y", strtotime($latest_post->post_date)); ?>
                                </small>
                                <h3><?php echo $latest_post->post_title; ?></h3>
                                <small><?php echo $category; ?></small>
                                <a href="<?php echo get_the_permalink($latest_post->ID); ?>">LEARN MORE</a>
                            </div>
                        </div>

                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</div>

<?php if (!empty($child_cats)) {
    foreach ($child_cats as $child_cat) {
        $posts = get_posts(
            [
                'posts_per_page' => 3,
                'cat' => $child_cat->term_id,
            ]
        ); ?>
        <div class="sub-category-posts full-width">
            <div class="inner-wrap">
                <div class="sub-category-posts--title">
                    <h2>
                        <?php echo $child_cat->name; ?>
                    </h2>
                    <a href="#0">View all</a>
                </div>
                <?php if (!empty($posts)) { ?>
                    <div class="sub-category-posts--list">
                        <ul>
                            <?php foreach ($posts as $post) { ?>
                                <li>
                                    <a href="<?php echo get_the_permalink($post->ID); ?>" class="sub-category-posts--list-single">
                                        <div class="post-image">
                                            <figure>
                                                <?php echo get_the_post_thumbnail($post->ID); ?>
                                            </figure>
                                        </div>
                                        <div class="post-info">
                                            <h3><?php echo $latest_post->post_title; ?></h3>
                                            <p><?php echo $post->post_content; ?></p>
                                        </div>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                <?php } ?>
            </div>
        </div>
    <?php } ?>
<?php } ?>