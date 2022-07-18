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

$cat = sanitize_text_field(get_query_var('post-cat'));

$currentPage = get_query_var('paged');

$activeCategory = "";

if (!empty($cat)) {
    $query = wp_parse_args([
        'posts_per_page' => 3,
        'tax_query' => [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => [$cat],
            ],
        ],
    ]);

    $activeCategory = $cat;
}

$postsQuery = new \WP_Query($query);
$posts = $postsQuery->posts;

$ids = [];

$activeCategoryObj = get_category_by_slug($cat);

if (!empty($child_cats)) { ?>
    <div class="post-filter">
        <?php $activeClass = empty($activeCategory) ? 'active' : ''; ?>
        <form action="<?php get_the_permalink(); ?>">
            <div class="cat-nav">
                <ul>
                    <li>
                        <button type="submit" name="post-cat" value="" class="filter-button'. <?php echo $activeClass; ?> .'">
                            Browse All
                        </button>
                    </li>
                    <?php foreach ($child_cats as $child_cat) {
                        $activeClass = !empty($activeCategory) && $activeCategory === $child_cat->slug ? 'active' : ''; ?>
                        <li>
                            <button type="submit" name="post-cat" value="<?php echo $child_cat->slug; ?>" class="filter-button'. <?php echo $activeClass; ?> .'">
                                <?php echo $child_cat->name; ?>
                            </button>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </form>
    </div>
<?php
} ?>

<?php if (!empty($posts)) { ?>
    <div class="child-category full-width">
        <div class="inner-wrap">
            <div class="child-category--title">
                <h1><?php echo $activeCategoryObj->name; ?></h1>
                <p><?php echo $activeCategoryObj->category_description; ?></p>
            </div>
            <div class="post-cards--grid">
                <ul class="post-cards--grid-inner">
                    <?php foreach ($posts as $post) {
                        $tags = implode(', ', wp_get_post_terms($post->ID, 'post_tag', ['fields' => 'names']));
                        $ids[] = $post->ID;
                    ?>
                        <li class="post-cards--grid-wrap">
                            <div class="post-cards--grid-item">
                                <figure>
                                    <?php echo get_the_post_thumbnail($post->ID); ?>
                                </figure>
                                <div class="post-info">
                                    <small>
                                        <?php echo date("M d, Y", strtotime($post->post_date)); ?>
                                    </small>
                                    <h3><?php echo $post->post_title; ?></h3>
                                    <?php if (!empty($tags)) { ?><small><?php echo $tags; ?></small><?php } ?>
                                    <a href="<?php echo get_the_permalink($post->ID); ?>">LEARN MORE
                                        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                            <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>
<?php }


$postsQuery = wp_parse_args(
    [
        'posts_per_page' => 6,
        'paged' => $currentPage ?? 1,
        'post__not_in' => $ids,
        'tax_query' => [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => [$cat],
            ],
        ],
    ]
);


$childPostsQuery = new \WP_Query($postsQuery);
$moreChildPosts = $childPostsQuery->posts;
$maxPages = $childPostsQuery->max_num_pages;

if (!empty($moreChildPosts) && !empty($cat)) { ?>
    <div class="sub-category-posts full-width">
        <div class="inner-wrap">
            <div class="sub-category-posts--title">
                <h2>
                    More <?php echo $activeCategoryObj->name; ?>
                </h2>
            </div>
            <?php if (!empty($moreChildPosts)) { ?>
                <div class="post-cards--single">
                    <ul>
                        <?php foreach ($moreChildPosts as $childPost) { ?>
                            <li>
                                <a href="<?php echo get_the_permalink($childPost->ID); ?>" class="post-cards--single-item">
                                    <div class="post-image">
                                        <figure>
                                            <?php echo get_the_post_thumbnail($childPost->ID); ?>
                                        </figure>
                                    </div>
                                    <div class="post-info">
                                        <h3><?php echo $childPost->post_title; ?></h3>
                                        <p><?php echo $childPost->post_excerpt; ?></p>
                                    </div>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
                <?php if ($maxPages > 1) { ?>
                    <div class="pagination">
                        <?php echo paginate_links(['total' => $maxPages, 'prev_text' => '', 'next_text' => '']) ?>
                    </div>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
<?php } ?>

<?php if (!empty($sticky_posts) && empty($cat)) { ?>
    <div class="featured-posts">
        <div class="inner-wrap">
            <div class="inner-banner">
                <div class="inner-banner-img">
                    <?php echo get_the_post_thumbnail($sticky_posts[0]->ID); ?>
                </div>
                <div class="inner-banner-content">
                    <span><?php echo date("M d, Y", strtotime($sticky_posts[0]->post_date)); ?></span>
                    <h3><?php echo $sticky_posts[0]->post_title; ?></h3>
                    <p><?php echo $sticky_posts[0]->post_excerpt; ?></p>
                    <a href="<?php echo get_the_permalink($sticky_posts[0]->ID); ?>">LEARN MORE
                        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
<?php
}
?>

<?php if (empty($cat)) { ?>
    <div class="latest-posts">
        <div class="inner-wrap">
            <h2>Latest & Trending</h2>
            <div class="post-cards--grid slick">
                <ul class="post-cards--grid-inner">
                    <?php foreach ($latest_posts as $latest_post) {
                        $category = implode(',', wp_get_post_terms($latest_post->ID, 'category', ['fields' => 'names']));
                    ?>
                        <li class="post-cards--grid-wrap">
                            <div class="post-cards--grid-item">
                                <figure>
                                    <?php echo get_the_post_thumbnail($latest_post->ID); ?>
                                </figure>
                                <div class="post-info">
                                    <small>
                                        <?php echo date("M d, Y", strtotime($latest_post->post_date)); ?>
                                    </small>
                                    <h3><?php echo $latest_post->post_title; ?></h3>
                                    <small><?php echo $category; ?></small>
                                    <a href="<?php echo get_the_permalink($latest_post->ID); ?>">LEARN MORE
                                        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                            <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>
<?php } ?>

<?php if (!empty($child_cats) && empty($cat)) {
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
                    <a href="<?php echo get_the_permalink() . '?post-cat=' . $child_cat->slug; ?>">View all
                        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" />
                        </svg>
                    </a>
                </div>
                <?php if (!empty($posts)) { ?>
                    <div class="post-cards--single">
                        <ul>
                            <?php foreach ($posts as $post) { ?>
                                <li>
                                    <a href="<?php echo get_the_permalink($post->ID); ?>" class="post-cards--single-item">
                                        <div class="post-image">
                                            <figure>
                                                <?php echo get_the_post_thumbnail($post->ID); ?>
                                            </figure>
                                        </div>
                                        <div class="post-info">
                                            <h3><?php echo $latest_post->post_title; ?></h3>
                                            <p><?php echo $post->post_excerpt; ?></p>
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