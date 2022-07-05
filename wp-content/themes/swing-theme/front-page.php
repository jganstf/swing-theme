<?php /* Template Name: Home */

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main-content-wrap">
   <?php include(locate_template('template-parts/home/home-hero.php', false, false));?>
   <div class="main page-content-wrap">
      <div class="inner-wrap">
         <?php //the_content() ?>
         <div class="home-about light-blue">
            <h2 class="h2-dark-blue"><?php echo $fields['about_heading'];?></h2>
            <p><?php echo $fields['about_content'];?></p>
            <div class="grid-three">
               <?php foreach($fields['about_items'] as $item):?>
                  <div class="card grid-item">
                     <h3><?php echo $item['heading']; ?></h3>
                     <p><strong><?php echo $item['statement']; ?></strong></p>
                     <p><?php echo $item['content']; ?></p>
                     <div class="icon-img" style="background-image: url(<?php echo $item['img']['sizes']['medium']; ?>)"></div>
                  </div>
               <?php endforeach;?>
            </div>
         </div>
         <div class="home-hear-from section-full">
            <div class="toggle-switch-wrap d-flex justify-content-end align-items-center">
               <p>Hear from:</p>
               <div class="toggle-switch-btn" style="transform: translate(0px, 0px); opacity: 1; visibility: inherit;">
                  <input id="skills-list" type="radio" value="skills" data-com.bitwarden.browser.user-edited="yes">
                  <label for="skills-list" class="link-hover">Skills</label>
                  <input id="tools-list" type="radio" value="tools" data-com.bitwarden.browser.user-edited="yes">
                  <label for="tools-list" class="link-hover">Tools</label>
                  <span class="switcher-toggle" style="width: calc((100% - 8px) / 2);"></span>
               </div>
            </div>
            <div class="slick">
               <?php foreach(get_posts([
                  'post_type' => 'testimonials',
                  'post_status' => 'publish',
                  'posts_per_page' => -1
               ]) as $i => $t):?>
               <div class="testimonial">
                  <div class="decor-img" style="background-image: url(https://picsum.photos/1920/<?php echo strval(1920 + $i); ?>)"></div>
                  <div class="test-content main">
                     <div class="inner-wrap">
                        <p><?php echo $t->post_content;?></p>
                        <cite>
                           <?php echo $t->post_title; ?>
                           <br/>
                           <?php echo get_field('citation_title', $t); ?>
                        </cite>
                     </div>
                  </div>
               </div>
               <?php endforeach;?>
            </div>
         </div>
         <div class="home-join">
            <div class="row">
               <div class="col-lg-6">
                  <h2>Join our community of school partners and substitute teachers.</h2>
                  <p><?php echo $fields['join_content'];?></p>
                  <div class="btns-wrap d-sm-flex">
                     <?php foreach($fields['join_btns'] as $btn):
                        $btn = $btn['btn_link']; ?>
                        <a href="<?php echo $btn['url'];?>" target="<?php echo $btn['target']?:'_self';?>" class="btn">
                           <?php echo $btn['title']; ?>
                        </a>
                     <?php endforeach;?>
                  </div>
               </div>
               <div class="partners col-lg-6 grid-three">
                  <?php foreach($fields['partners'] as $partner): ?>
                     <div class="partner grid-item">
                        <img src="<?php echo $partner['image']['sizes']['medium'];?>" alt="" width="<?php echo $partner['image']['sizes']['medium-width'];?>" height="<?php echo $partner['image']['sizes']['medium-height'];?>" />
                     </div>
                  <?php endforeach;?>
               </div>
            </div>
         </div>
         <?php //include(locate_template('template-parts/home/home-cta.php', false, false));?>
      </div>
   </div>
</main>

<?php
endwhile;
get_footer();