$.event.special.touchstart = {
   setup: function( _, ns, handle ) {
       this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
   }
};
$.event.special.touchmove = {
   setup: function( _, ns, handle ) {
       this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
   }
};
$.event.special.wheel = {
   setup: function( _, ns, handle ){
       this.addEventListener("wheel", handle, { passive: true });
   }
};
$.event.special.mousewheel = {
   setup: function( _, ns, handle ){
       this.addEventListener("mousewheel", handle, { passive: true });
   }
};

document.addEventListener(
   "touchstart",
   function (e) {
      console.log("TEST: 'Do Not Use Passive Listeners to improve scroll performance'");
      e.preventDefault();
   },
   { passive: true }
);