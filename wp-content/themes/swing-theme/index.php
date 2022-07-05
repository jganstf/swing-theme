<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each one. For example, tag.php (Tag archives),
 * category.php (Category archives), author.php (Author archives), etc.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 */

get_header(); ?>

<main id="main_content" class="main-content-wrap">
  <div class="main">
    <?php //include( locate_template( 'template-parts/archive-hero.php', false, false ) );  ?>
    <div class="hero archive-hero">
      <div class="inner-wrap">
          <div class="hero-content">
            <!-- <p class="pre-heading">Category</p> -->
            <?php //include(locate_template('template-parts/archive-filter.php', false, false));?>
            <div id="archive-filter-wrap"></div>
            <h1 class="h-underline"><?php echo get_queried_object()->name ?: ($fields['hero_heading']?:$post->post_title); ?></h1>
          </div>
      </div>
    </div>
    <div class="inner-wrap">
      <div class="page-default-content clearfix mb-5">
        <article class="main-content">
          <!-- <div id="news-section-wrap" data-posts="<?php //echo data_attribute($wp_query->posts);?>"></div> -->
          <div class="news-grid">
            <?php while ( have_posts() ) : the_post();  
              $categories = get_the_category($p->ID);//[0]
              $cat_arr = [];
              foreach ($categories as $category) {
                $cat_arr [] = [
                  'name' => $category->cat_name,
                  'link' => get_category_link($category->term_id)
                ];
              }; 
              $featured_image = get_the_post_thumbnail_url($post->ID, 'fp-xlarge');
              ?>
              <div class="news-post rel">
                <a class="fillall" href="<?php echo get_field('external_link', $p->ID)?: get_permalink();;?>"><span class="sr-only">View <?php echo $post->post_title; ?></span></a>
                <div class="new-post-image" style="background-image: url({post.img}})"></div>
                <div class="new-post-content">
                  <a class="red" style=" position: relative; z-index: 1;" href="<?php echo $cat_arr[1]['link'];?>">
                    <span class=""><?php echo $cat_arr[1]['name']; ?></span>
                  </a>
                  <h3><?php echo wp_trim_words($post->post_title, 10); ?></h3>
                  <!-- TODO link -->
                  <a href="<?php echo get_field('external_link', $p->ID)?: get_permalink();?>" class="post-source">
                    <?php echo get_field('article_source', $post->ID);?>
                  </a>
                </div>
              </div>
            <?php endwhile;?>
          <?php  if (  $wp_query->max_num_pages > 1 ): ?>
	          <div class="ml-2 mt-5 theme_loadmore btn outlined-btn btn-red">More posts</div>
          <?php endif; ?>
          </div>
        </article>
      </div>
    </div>
  </div>
</main>

<?php get_footer();