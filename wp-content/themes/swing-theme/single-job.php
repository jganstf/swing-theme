<?php

$fields = get_fields();
get_header();
while(have_posts()): the_post(); ?>

<main id="main-content" class="main page-content-wrap">
   
   <?php //include(locate_template('template-parts/hero.php', false, false));?>
    <div class="job-hero hero-full-width">
	    <div class="_main">
		    <div class="inner-wrap">
			    <div class="hero-content">
					<div class="inner d-flex justify-content-between">
						<div class="text-wrap">
				    		<h1><?php the_title();?></h1>

							<?php if($fields['pay_range']):?>
								<p class="pay-range"><?php echo $fields['pay_range'];?></p>
							<?php endif;?>
							
							<?php if($fields['districts_copy']):?>
				    			<p><?php echo $fields['districts_copy'];?></p>
							<?php endif;?>
		
							<?php 
							$link = $fields['apply_link'];
							if( $link ): 
								$link_url = $link['url'];
								$link_title = $link['title'];
								$link_target = $link['target'] ? $link['target'] : '_self';
								?>
							<div class="btns-wrap">
								<a class="btn" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
							</div>
							<?php endif; ?>
						</div>
						
						<?php 
						$image = $fields['hero_image'];
						if( !empty( $image ) ): ?>
						<div class="hero-img">
							<img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
						</div>
						<?php endif; ?>
					</div>
						
			    </div>
				

				
			    <!-- <div class="hero-img">
				    <div class="decor-img" style="background-image: url(https://swing-education.local/wp-content/uploads/2022/07/Copy-of-iStock-522138534-v2-2048x1365.jpg)"></div>
			    </div> -->
		    </div>
	    </div>
    </div>
   
    <div class="inner-wrap">
	    <div class="s1 light-blue">
		    <div class="section-row mw-1033">
				<h2>Swing Education makes finding substitute teaching jobs easy and on your terms</h2>
				<p class="bdy-md">Founded by former K12 educators and administrators, our mission is to create technology that makes it easy to match passionate educators like yourself with the job openings in your area. Since 2015, we have become the fastest-growing company in our space and have successfully filled over 300,000+ absence days, and partnered with over 2,800 schools and districts across the country.</p>
		    </div>
		    <div class="section-row mw-1033">
				<h2>Become a classroom hero!</h2>
				<p class="bdy-md">Whether you are an experienced sub or new to subbing, our platform speeds you through the qualification process so you can start working quickly. Unlike the traditional method of finding sub work, working through Swing means you can teach at any school in our network, meaning more opportunities and better assignments without the hassle of applying separately to every district and school.</p>
			</div>				
	    </div>	
		<div class="s2">
			<div class="section-row">
				<div class="row">
					<div class="col col-12">
						<h2>Why subs choose Swing</h2>
					</div>
				</div>
					
				<div class="row cards-wrap cards-row-wrap justify-content-center">
					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/background-check-icon.svg';?>)">
								</div>
								<p>You will be able to select the assignments that best fit your preferences.</p>
							</div>
						</div>
					</div>

					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/jobs-in-your-area-icon.svg';?>)">
								</div>
								<p>You will be granted access to all available jobs in your area.</p>
							</div>
						</div>
					</div>

					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/earn-bonuses-icon.svg';?>)">
								</div>
								<p>You will have a chance to earn bonuses throughout the year.</p>
							</div>
						</div>
					</div>
					
					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/referral-bonsues-icon.svg';?>)">
								</div>
								<p>You will always earn the maximum pay. We never take a cut of your earnings.</p>
							</div>
						</div>
					</div>

					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/referral-bonsues-icon.svg';?>)">
								</div>
								<p>You will get paid on time, every Friday.</p>
							</div>
						</div>
					</div>

					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/support-whenever-you-have-questions-icon.svg';?>)">
								</div>
								<p>You will find answers and receive support whenever you have questions or need help.</p>
							</div>
						</div>
					</div>

					<div class="light-blue-card col col-12 col-md-6">
						<div class="inner">
							<div class="d-flex align-items-center">
								<div class="icon-wrap">
									<img src="<?php echo imgdir() . '/icons/referral-bonsues-icon.svg';?>)">
								</div>
								<p>You will get an opportunity to earn referral bonuses by telling your friends about us.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
			
			<div class="section-row requirements">
					<div class="row">
						<div class="col col-12">
							<h2>Requirements</h2>
						</div>
					</div>
						
					<div class="row cards-wrap cards-col-wrap justify-content-center">
						<div class="light-blue-card col col-12 col-md-6 col-xl-4">
							<div class="inner">
								<div class="d-flex flex-column align-items-center">
									<div class="icon-wrap">
										<img src="<?php echo imgdir() . '/icons/bachelors-degree-icon.svg';?>)">
									</div>
									<p>You will be able to select the assignments that best fit your preferences.</p>
								</div>
							</div>
						</div>
			
						<div class="light-blue-card col col-12 col-md-6 col-xl-4">
							<div class="inner">
								<div class="d-flex flex-column align-items-center">
									<div class="icon-wrap">
										<img src="<?php echo imgdir() . '/icons/teaching-credential-icon.svg';?>)">
									</div>
									<p>You will be granted access to all available jobs in your area.</p>
								</div>
							</div>
						</div>
			
						<div class="light-blue-card col col-12 col-md-6 col-xl-4">
							<div class="inner">
								<div class="d-flex flex-column align-items-center">
									<div class="icon-wrap">
										<img src="<?php echo imgdir() . '/icons/background-check-icon.svg';?>)">
									</div>
									<p>You will have a chance to earn bonuses throughout the year.</p>
								</div>
							</div>
						</div>
	
					</div>
				</div>
			</div>
			<div class="s3 light-blue">
				<div class="row">
					<div class="col col-12">
						<h2>What to expect next</h2>
					</div>
				</div>
				<div class="step-slider">
					<div class="ss-nav-wrap">
						<div class="ss-nav f-flex row align-items-center justify-content-between">
							<a class="btn" href="#" data-slide="1">Step 1</a>
							<a class="btn" href="#" data-slide="2">Step 2</a>
							<a class="btn" href="#" data-slide="3">Step 3</a>
							<a class="btn" href="#" data-slide="4">Step 4</a>
							<a class="btn" href="#" data-slide="5">Step 5</a>
						</div>
					</div>
					<div class="pseduo-track"></div>
					<div class="slider">
						<div class="slide">
							<div class="inner">
								<h3>Step 01</h3>
								<p>Once you click apply, you will be taken to Swing’s application page.</p>
							</div>
						</div>
						<div class="slide">
							<div class="inner">
								<h3>Step 02</h3>
								<p>Once you click apply, you will be taken to Swing’s application page. Once you click apply, you will be taken to Swing’s application page.</p>
							</div>
						</div>
						<div class="slide">
							<div class="inner">
								<h3>Step 03</h3>
								<p>Once you click apply, you will be taken to Swing’s application page.</p>
							</div>
						</div>
						<div class="slide">
							<div class="inner">
								<h3>Step 04</h3>
								<p>Once you click apply, you will be taken to Swing’s application page.</p>
							</div>
						</div>
						<div class="slide">
							<div class="inner">
								<h3>Step 05</h3>
								<p>Once you click apply, you will be taken to Swing’s application page.</p>
							</div>
						</div>
					</div>
				</div>
				
				<?php 
				$link = $fields['apply_link'];
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
				<div class="btn-wrap">
					<a class="btn" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
				</div>
				<?php endif; ?>
				
			</div>
			<div class="testimonial">
				<p>"If you are an educator looking to get your feet wet, expand your career, or return to the basic essentials of teaching, Swing Education is where you want to be."</p>
				<cite>- P. Felton<br>
					<span>Swing Education Substitute Teacher</span>
				</cite>
			</div>
			<div class="disclaimer">
				<p>We welcome everyone from brand new to experienced veteran teachers! Employment at the Company is employment at-will, unless otherwise specified in a written employment agreement. Swing Education is an Equal Opportunity Employer that does not discriminate on the basis of actual or perceived race, color, national origin, ancestry, sex (which includes pregnancy, childbirth, breastfeeding, and medical conditions related to pregnancy, childbirth or breastfeeding these), gender, gender identity, and gender expression, religious creed, disability (mental and physical) including HIV and AIDS, medical condition (such as cancer and genetic characteristics), genetic information, age, marital status, sexual orientation, sexual or other reproductive health decisions, military or veteran status, denial of family, and medical care leave, or any other characteristic protected by federal, state or local law. Swing is dedicated to supporting individuals of varying ethnicity, gender, sexual orientation, religion, age, and other backgrounds. Here at Swing, we’ve made a commitment to diversity and inclusion. We’re ready to support you wherever you are in your teaching career by getting you into the classroom where subs are needed most. Day pay rate defined as an 8 hour day.</p>
			</div>
		</div>
   </div>
</main>

<?php
endwhile;
get_footer();




