import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const { $ } = window

export default {
	init() {
      gsap.registerPlugin(ScrollTrigger)
		generatePageNav()

      const tl = gsap.timeline({
         defaults: {
            duration: 0.2,
            ease:'power1.out',
            opacity: 0,
         },
         // scrollTrigger: {},
      })
      tl.from('.update-contact', {})
         .from('.hero-tos-content h1', {y: -16})
         .from('.hero-tos-content h1 ~ *', {x:16}, '-=0.2')
         .from('aside', {y:16}, '+=0.2')
         .from('aside a:not(:first-child', {y:16, stagger: 0.05})//, '+=0.2') //!
      $('h2').each((_idx, el) => gsap.from(el, { delay: 0.2, opacity: 0, y: -16, scrollTrigger: { trigger: el, start: 'top 96%'}}))
      // $('article p').each((_idx, el) => gsap.from(el, { opacity: 0, x: 16, scrollTrigger: { trigger: el, start: 'top 90%'}}))
	},
	finalize() {
		// JavaScript to be fired on the home page, after the init JS
	},
}

//TODO center of page intersection
// vanilla
// padding addition to top of scroll position
// @see https://stackoverflow.com/questions/38069213/add-padding-top-to-scroll-when-using-href-id
function generatePageNav() {
   // return
   const nav = document.querySelector('.tos-page-nav')
   const h2s = document.querySelectorAll( '.main-content-wrap h2' );
   h2s.forEach((h2) => {
      let a = document.createElement('a')
      a.innerText = h2.innerText
      const id = h2.innerText.toLowerCase().replace(/\s+/g, '-')
      h2.id = id
      a.id = id + '-anchor'
      a.href = `#${id}`
      a.classList.add('tos-nav-link')
      nav.appendChild(a)
   })
   let enableScrolling = true;
   let activeId = location.hash.substr( 1 );
   if ( ! activeId ) {
      activeId = h2s[ 0 ].id;
   }
   // console.log(activeId)
   // let navAnchors = document.querySelectorAll('.tos-nav-link')
   let inPageNavAnchors = Array.from(document.querySelectorAll('.tos-nav-link'));
   let activeAnchor = document.querySelector( `a[id="${ activeId }-anchor"]` );
   activeAnchor.classList.add( 'active' );
   document.onscroll = () => {
      if ( enableScrolling ) {
         for ( const h2 of h2s ) {
            if ( 0 < h2.getBoundingClientRect().bottom ) {
               if ( ! activeId.includes( h2.id ) ) {
                  inPageNavAnchors.map( ( item ) => {
                     item.classList.remove( 'active' ) 
                  });
                  activeId = h2.id;
                  activeAnchor = document.querySelector(
                     `a[id="${ activeId }-anchor"]`
                  );
                  activeAnchor.classList.add( 'active' );
               }
               break;
            }
         }
      }
   };
   let t
   $(inPageNavAnchors).click((e) => {
      // console.log(e.target)
      // clearInterval(t)
      enableScrolling = false
      $(inPageNavAnchors).removeClass('active')
      // this.classList.add('active')
      e.target.classList.add('active')
      let t = setTimeout( () => {
         enableScrolling = true;
      }, 1000 );
   })

}
