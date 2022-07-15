<script>
   import Modal from './Modal.svelte'
   // export let content
</script>

<Modal id={'login'}>
   <!-- {content} -->
   <div class="popup-login-content">
      <h2>Where to?</h2>
      <div class="btns-wrap d-sm-flex">
         <a href={"#"} class="btn">Sub Portal</a>
         <a href={"#"} class="btn light">School Portal</a>
      </div>
   </div>
</Modal>