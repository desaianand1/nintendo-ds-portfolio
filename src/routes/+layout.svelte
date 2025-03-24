<script lang="ts">
  import '../app.css'
  let { children } = $props()
</script>

<div class="antialiased min-h-screen bg-black text-white touch-none">
  {@render children()}
</div>
