<template>
  <div>
    <h1><em>T</em>ableau de bord</h1>
    <pie-chart :data="chartData" :options="chartOptions" class="chart"></pie-chart>
    <h2><em>T</em>op <em>S</em>emaine</h2>
    <div v-for="movie in movies" :key="movie.title" style="display: inline-block">
      <div>
        <img :src="posterDisplay(movie.poster)" style="height: 130px">
        <p>{{ movie.title }}</p>
        <p>{{ movie.week }} entrées</p>
      </div>
    </div>
    <h2><em>T</em>op <em>M</em>ois</h2>
    <p>Fetch data, trier par entrée, etc...</p>
    <h2><em>T</em>op <em>A</em>nnée</h2>
    <p>Fetch data, trier par entrée, etc...</p>
    <a href="https://ej2.syncfusion.com/vue/documentation/drop-down-list/filtering/">Filtrer avec un menu dropdown</a>
    <a href="https://vue-chartjs.org/">Besoin de camembert ? (graphique)</a>
  </div>
</template>

<script>
import PieChart from './PieChart.js'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    PieChart
  },
  data () {
    return {
      title: 'Tableau de bord',
      movies: null,
      chartOptions: { // PieChart options object
        animation: { animateRotate: true }, // the chart will animate in with a rotation animation
        hoverBorderWidth: 3
      },
      chartData: { // PieChart data object
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 3,
        labels: ['Science-fiction', 'Fantasy', 'Action', 'Drame', 'Animation'],
        datasets: [
          {
            label: 'Data Test',
            backgroundColor: ['#D94188', '#2F3072', '#191919', '#9FA3A5', '#d1d2e8'],
            data: [1, 10, 5, 3, 5]
          }
        ]
      }
    }
  },
  created () {
    // Get the data when the vue is created and when the data is already watched
    this.fetchData()
  },
  methods: {
    // Ajax call function
    fetchData: async function () {
      this.error = this.movies = null
      this.loading = true
      axios
        .get('http://localhost:4000/movies')
        .then(response => {
          this.movies = response.data // Save the data in movies
          this.loading = false
        })
        .catch(error => { this.error = error }) // If it catches an error, display the error message
    },
    // Select an image to display as poster
    posterDisplay: function (posterArr) {
      if (posterArr[0] !== '') {
        try {
          let imgUrl = require('../assets/' + posterArr[0]) // First, try to get in local
          return (imgUrl)
        } catch (e) {
          console.log('Image non trouvée: ' + e)
          return posterArr[1] // If local failed use the outside URL instead
        }
      } else {
        return posterArr[1] // Then if there is no local image saved, use the outside URL one
      }
    }
  },
  
  computed: {
    topMovies: function () {
      return this.movies.sort((a, b) => { 
        let modifier = 1
        if (a[this.week] < b[this.week]) return -1 * modifier
        if (a[this.week] > b[this.week]) return 1 * modifier
        return 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  width: 17%;
  float: right;
  padding-right: 5%;
}
</style>
