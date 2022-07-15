<script>
   import Modal from './modal.svelte'
   // export let content
</script>

<Modal>
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