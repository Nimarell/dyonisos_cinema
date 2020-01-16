<template>
  <div>
    <h1><em>T</em>ableau de bord</h1>
    <!-- If there is a movie with StandBy status then show notifications -->
    <div v-if="movies && statusFiltered[0] && isOpen" class="notif"> <!-- Have to check if 'movies' exist to check on 'statusFiltered' -->
      <h3><em>N</em>otifications</h3>
      <p>{{ statusFiltered.length }} films en attente !</p>
      <ul>
        <router-link :to="`/films/modifier-film/${movie.id}`" tag="li" v-for="movie in statusFiltered" :key="movie.title">{{ movie.title }}</router-link>
      </ul>
      <font-awesome-icon icon="times" class="close" @click="isOpen = false" />
    </div>
    <!-- PieChart stats -->
    <pie-chart :data="chartData" :options="chartOptions" class="chart"></pie-chart>
    <!-- Menu to select which Top to show -->
    <select v-model="selected">
      <option disabled value="">Afficher...</option>
      <option value="week">Top semaine</option>
      <option value="month">Top mois</option>
      <option value="year">Top année</option>
      <option value="all">Top de Tous les Temps</option>
    </select>
    <!-- Title to display according to the selected -->
    <h2 v-if="selected == 'week'"><em>T</em>op <em>5</em> <em>S</em>emaine</h2>
    <h2 v-if="selected == 'month'"><em>T</em>op <em>5</em> <em>M</em>ois</h2>
    <h2 v-if="selected == 'year'"><em>T</em>op <em>5</em> <em>A</em>nnée</h2>
    <h2 v-if="selected == 'all'"><em>T</em>op <em>5</em> de <em>T</em>ous les <em>T</em>emps</h2>
    <!-- Top 5 to display according to the selected -->
    <table v-if="movies">
      <td v-for="movie in topMovies" :key="movie.title" style="display: inline-block">
        <tr><img :src="posterDisplay(movie.poster)" style="height: 130px"></tr>
        <tr><p>{{ movie.title }}</p></tr>
        <tr>
          <p v-if="selected == 'week'">{{ movie.week }} entrées</p>
          <p v-if="selected == 'month'">{{ movie.month }} entrées</p>
          <p v-if="selected == 'year'">{{ movie.year }} entrées</p>
          <p v-if="selected == 'all'">{{ movie.all }} entrées</p>
        </tr>
      </td>
    </table>
    <div class="wrapper">
      <div class="info b">
          <h2><font-awesome-icon icon="person-booth" /> Visite sur le site</h2>
          <h3>Aujourd'hui :</h3>
          <p>5453</p>
      </div>
      <div class="info v">
          <h2><font-awesome-icon icon="money-check-alt" /> Profits</h2>
          <h3>Aujourd'hui :</h3>
          <p>21023 €</p>
      </div>
      <div class="info n"></div>
      <div class="info g"></div>
      <div class="todo"></div>
    </div>
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
      selected: 'week',
      isOpen: true, // Does the Notification window should show
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
    },
    movieLink: function (movieID) {
      this.$router.push('/films/modifier-film/' + movieID)
    }
  },

  computed: {
    topMovies: function () {
      let tab = this.movies.sort((a, b) => {
        let modifier = 1
        if (a[this.selected] > b[this.selected]) return -1 * modifier
        if (a[this.selected] < b[this.selected]) return 1 * modifier
        return 0
      })
      return tab.slice(0, 5)
    },
    statusFiltered: function () {
      return this.movies.filter(movie => {
        return (movie.status.toLowerCase().includes('en attente'))
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  width: 250px;
  float: right;
  padding-right: 5%;
}
tr p {
  width: 100px;
  height: 1.3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}
td {
  height: 12em;
}
.notif p {
  margin: 0;
  padding-left: 0.5em;
  padding-bottom: 0.5em;
  font-weight: bold;
  color: #D94188;
}
ul {
  padding-bottom: 1em;
  margin: 0;
}
li {
  padding-left: 2em;
  cursor: pointer;
  text-decoration: underline;
  color: #D94188;
}
li:hover {
  font-style: italic;
}
h3 {
  margin: 0.5em;
}
.notif {
  position: relative;
  background-color: #ebeced;
  border: solid 1px #D94188;
  border-radius: 15px;
  margin-bottom: 25px;
  z-index: 0;
}
.close {
  position: absolute;
  top: 5%;
  right: 1%;
  cursor: pointer;
  font-size: 20px;
}
.close:hover {
  color: #D94188;
}
.info {
  border-radius: 15px;
  width: 25em;
  height: 13em;
  box-shadow: 3px 3px 3px grey;
  color: white;
  text-align: center;
}
.info:hover {
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255, 255, 255, 0.3))
}
.info.b {
  background-color: #2F3072;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}
.info.v {
  background-color: #D94188;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
}
.info.n {
  background-color: #191919;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 2;
}
.info.g {
  background-color: #9FA3A5;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
}
.wrapper {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin: 2em 0;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-template-columns: 25em 25em 45em;
  grid-template-rows: 13em 13em;
}
.todo {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  background-color: #9FA3A5;
  border-radius: 15px;
  box-shadow: 3px 3px 3px grey;
}
.todo:hover {
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255, 255, 255, 0.3))
}
</style>
