<script>
   import Modal from './Modal.svelte'
   // export let content
</script>

<Modal id={'get-started'}>
   <!-- {content} -->
   <div class="popup-get-started-content">
      <h2>Ready to Get Started?</h2>
      <p>Let's make sure you get to the right place! Please tell us a bit more about yourself.</p>
      <div class="btns-wrap d-sm-flex justify-content-center" style="margin-top: 1rem;">
         <a href={"#"} class="btn">Become a Sub</a>
         <a href={"#"} class="btn">Request a Sub</a>
      </div>
   </div>
</Modal> 