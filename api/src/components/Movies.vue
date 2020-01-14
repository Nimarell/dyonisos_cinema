<template>
  <div>
    <h1><em>F</em>ilms</h1>
    <div style="padding: 30px 5% 30px 0">
      <router-link to="/films/ajouter-film" tag="button"><em>+</em> Ajouter un film</router-link>
      <select v-model="selected">
        <option disabled value="">Trier par...</option>
        <option value="dateNew">Plus récent</option>
        <option value="date">Plus ancien</option>
        <option value="status">Status</option>
        <option value="title">Nom</option>
      </select>
      <input type="search" placeholder="Rechercher" v-model="search">
    </div>
    <!-- Change key to force Rerendering the component if needed -->
    <MoviesTab @forceRerender="updateKey++" :key="updateKey" :sortBy="selected" :search="search" />
  </div>
</template>

<script>
import MoviesTab from '@/components/MoviesTab'

export default {
  components: { MoviesTab },
  name: 'Movies',
  data () {
    return {
      selected: 'dateNew', // Filter by newest by default
      search: '',
      updateKey: 0
    }
  }
}
</script>

<style scoped>
select, input {
  width: 150px;
  height: 30px;
  float: right;
  margin-left: 2%;
}
</style>
