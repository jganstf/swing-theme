<script>
   import { beforeUpdate, afterUpdate, onMount } from "svelte";
   import { fade } from 'svelte/transition'
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   gsap.registerPlugin(ScrollTrigger)
   const jq = window.$

   //export
   let testimonials = homeTestimonials
   $:console.log(testimonials)
   let switchState = 'subs';
   $: activeTestimonials = testimonials[switchState]

   beforeUpdate( async () => {
      if(jq('slick').length) {
         await gsap.to('.slick', {opacity: 0, duration: 1})
      }
      jq('.slick').slick('unslick')
   })
   afterUpdate(() => {
      jq('.slick').slick({
         adaptiveHeight: true,
         arrows: false,
			dots: true,
			fade: true,
			slidesToShow: 1
      })
      if(jq('slick').length) {
         gsap.set('.slick', { opacity: 0 })
         gsap.to('.slick', { opacity: 1, duration: 1, ease:'power1.out' })
      }
   })
</script>

<div class="home-hear-from section-full">
   <div class="toggle-switch-wrap d-flex justify-content-end align-items-center">
      <form class="toggle-switch">
         <p class="label">Hear from:</p>
         <div class="switch-field">
            <input type="radio" id="radio-one" name="switch-one" value="subs" checked on:change={() => (switchState = 'subs')} />
            <label for="radio-one">From Subs</label>
            <input type="radio" id="radio-two" name="switch-one" value="schools" on:change={() => (switchState = 'schools')} />
            <label for="radio-two">From Schools</label>
            <span class="indicator" />
         </div>
      </form>
   </div>
   <div class="slick">
      {#each activeTestimonials as t, idx}
         <div class="home-testimonial">
            <div
               class="decor-img"
               style="background-image: url(https://picsum.photos/800/{(800 + idx).toString()})"
            />
            <div class="test-content main">
               <div class="inner-wrap">
                  <p>"{t.post_content}"</p>
                  <cite>
                     {t.post_title}
                     <br />
                     {t.citation_title}
                  </cite>
               </div>
            </div>
         </div>
      {/each}
   </div>
</div>
