<template>
  <div>
    <h1><em>F</em>ilms</h1>
    <div style="padding: 30px 0">
      <router-link to="/films/ajouter-film" tag="button"><em>+</em> Ajouter un film</router-link>
    </div>
    <MoviesTab @forceRerender="updateKey++" :key="updateKey" /> <!-- Attributes to force Rerendering the component if needed -->
  </div>
</template>

<script>
import MoviesTab from '@/components/MoviesTab'

export default {
  components: { MoviesTab },
  name: 'Movies',
  data () {
    return {
      updateKey: 0
    }
  }
}
</script>
