<script>
   // import { onMount, afterUpdate, beforeUpdate } from 'svelte';
   // import { query_selector_all } from "svelte/internal";
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   // onMount(()=> {
   //    console.log('mount')
   //    console.log(document.querySelector('.close-btn'))
   // })
   // afterUpdate(()=> {
   //    console.log('after' + document.querySelector('.close-btn'))
   // })
   
   gsap.registerPlugin(ScrollTrigger)
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
<!-- href="//maps.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"  -->
<!-- <a class="btn" 
   href="#modal"
   data-lity
   on:click={() => animateShow()}
   >
      Modal
</a> -->

<div id="modal" class="modal-wrap lity-hide">
   <div class="modal">
      <div data-lity-close class="close-btn _lity-close" aria-label="Close (Press escape to close)">
         <svg data-lity-close fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="60px" height="60px">
            <path data-lity-close d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/>
         </svg>
         <span>Close</span>
      </div>
      <div class="modal-content">
         <slot></slot>
      </div>
   </div>
</div>