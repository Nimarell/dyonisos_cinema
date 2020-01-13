<template>
    <div>
      <!-- Loading during Ajax call -->
      <div class="loading" v-if="loading">
        Chargement...
      </div>
      <!-- Error message if Ajax call failed  -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <!-- Movies table created with an Ajax call -->
      <table v-if="movies" class="tab">
        <tr>
          <th>Affiche</th>
          <th>Nom</th>
          <th>Genre</th>
          <th width="50%">Synopsis</th>
          <th>Date de sortie</th>
          <th>Status</th>
          <th>Modifier</th>
        </tr>
        <tr v-for="movie in movies" :key="movie.id"> <!-- Get all movies from the 'movies' array and create the table with it -->
          <td><img :src="posterDisplay(movie.poster)" style="width: 100px"></td>
          <td>{{ movie.title }}</td>
          <td><p v-for="genr in movie.genre" :key="genr">{{ genr }}</p></td> <!-- Use 'genre' array to display all the genres of the movie as strings -->
          <td style="text-align: left">{{ movie.synopsis }}</td>
          <td>{{ movie.date }}</td>
          <td>{{ movie.status }}</td>
          <td>
            <font-awesome-icon icon="edit" class="edit" @click="editing(movie.id)" />
            <font-awesome-icon icon="trash-alt" class="trash" @click="deleting(movie.title, movie.id)" />
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MoviesTab',
  data () {
    return {
      loading: false,
      movies: null,
      error: null
    }
  },
  created () {
    // Get the data when the vue is created and the data is already watched
    this.fetchData()
  },
  watch: {
    // Call the method again if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData: async function () { // Ajax call function
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
    posterDisplay: function (posterArr) { // Select an image to display as poster
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
    editing: function (movieID) {
      this.$router.push('/films/modifier-film/' + movieID)
    },
    deleting: function (movieName, movieID) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ' + movieName + '?')) { // Ask the user to confirm the deleting
        axios.delete('http://localhost:4000/movies/' + movieID) // Url to delete, thanks to the ID
          .then(response => {
            this.$emit('forceRerender') // Force rerendering the table component to show that the movie has been deleted
            alert('Supprimé avec succès!') // Confirmation to the user
          })
          .catch(error => { alert('Une erreur s\'est produite: ' + error) }) // If it catches an error, show the error message
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  padding-right: 5%;
  text-align: center;
}
td {
  font-weight: bold;
}
th {
  font-size: 18px;
  background-color: #191919;
  color: white;
}
p {
  margin: 0;
}
.trash {
  color: red;
  cursor: pointer;
  font-size: 20px;
}
.edit {
  color:#2f3072;
  cursor: pointer;
  font-size: 20px;
}
</style>
