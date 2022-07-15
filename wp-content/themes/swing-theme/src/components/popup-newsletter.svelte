<script>
   import { gsap } from "gsap"
   import { ScrollTrigger } from "gsap/ScrollTrigger"
   import Modal from './modal.svelte'
   // export let content
   function _animateShow() {
      const tl = gsap.timeline({})
      var textWrapper = document.querySelector('.modal h2')
	   textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>")
      gsap.set('.modal h2 .word', { opacity: 0, y: 24, x: 0, rotateZ: 0 })
      gsap.set('.modal h2 ~ *', { opacity: 0, y: 24 })
      tl.to('.modal h2 .word', {
			delay: 0.2,
			duration: 0.5,
			ease: "elastic.out(1,0.5)",
			opacity: 1,
			rotateZ: 0,
			stagger: 0.075,
			x: 0,
			y: 0,
		})
      .to('.modal h2 ~ *', {
         duration: 0.3,
         ease: 'power1.out',
         opacity:1, 
         y: 0
      }, '-=0.5')
   }
</script>
<a class="btn" 
   href="#newsletter"
   data-lity
   on:click={() => _animateShow()}
   >
      Newsletter
</a>
<Modal id={'newsletter'}>
   <div class="popup-newsletter-content _d-flex _flex-column">
      <!-- {content} -->
      <h2>Subscribe to Our Newsletter</h2>
      <p>Let's make sure you get to the right place! Please tell us a bit more about yourself.</p>
      <form>
         <div class="d-flex flex-column">
            <label for="email">Email*</label>
            <input name="email" id="email" type="email" placeholder="Enter email..." />
         </div>
         <input type="submit" value="Subscribe" class="btn" />
      </form>
   </div>
</Modal>