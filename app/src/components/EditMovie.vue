<template>
  <div>
    <h1><em>F</em>ilms</h1>
    <h3><em>{{ letter }}</em>{{ msg0 }}</h3>
    <h2><em>D</em>étail du film à {{ msg1 }}</h2>

    <div class="loading" v-if="loading">
      Chargement...
    </div>
    <!-- MOVIE DETAILS FORM -->
    <form
      id="app"
      @submit="checkForm"
      method="post"
    >
      <p v-if="errors.length"> <!-- If informations is missing when submitting -->
        <b>Veuillez remplir ces champs:</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li> <!-- Show what informations is missing -->
        </ul>
      </p>

      <p>
        <label for="title">Titre</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
        >
      </p>
      <p>
        <label for="originalTitle">Titre original</label>
        <input
          id="originalTitle"
          v-model="originalTitle"
          type="text"
          name="originalTitle"
        >
      </p>
      <p>
        <label for="poster">Affiche</label>
          <input type="file" name="poster">
          <input type="text" name="poster" v-model="poster[1]" placeholder="Ou via une URL...">
      </p>
      <p>
        <label for="duration">Durée</label>
        <input
          id="durationH"
          class="numbers"
          v-model="durationH"
          type="number"
          name="durationH"
          min="0"
        > Heures
        <input
          id="durationM"
          class="numbers"
          v-model="durationM"
          type="number"
          name="durationM"
          min="0"
          max="59"
        > Minutes
      </p>
      <p>
        <label for="producer">Producteur</label>
        <input
          id="producer"
          v-model="producer"
          type="text"
          name="producer"
        >
      </p>
      <p>
        <label for="director">Réalisateur</label>
        <input
          id="director"
          v-model="director"
          type="text"
          name="director"
        >
      </p>
      <p>
      <p>
        <label for="composer">Compositeur</label>
        <input
          id="composer"
          v-model="composer"
          type="text"
          name="composer"
        >
      </p>
      <p>
        <label for="casting">Distribution</label>
        <input
          id="casting"
          v-model="casting"
          type="text"
          name="casting"
          placeholder="Acteur 1, Actrice 2, ..."
        >
      </p>
      <p style="display: inline-flex">
        <label for="genre">Genre</label>
        <ul>
          <li><input type="checkbox" id="action" value="Action" v-model="genre" name="genre"> Action</li>
          <li><input type="checkbox" id="animation" value="Animation" v-model="genre" name="genre"> Animation</li>
          <li><input type="checkbox" id="auteur" value="Auteur" v-model="genre" name="genre"> Auteur</li>
          <li><input type="checkbox" id="aventure" value="Aventure" v-model="genre" name="genre"> Aventure</li>
          <li><input type="checkbox" id="catastrophe" value="Catastrophe" v-model="genre" name="genre"> Catastrophe</li>
          <li><input type="checkbox" id="comedie" value="Comédie" v-model="genre" name="genre"> Comédie</li>
        </ul>
        <ul>
          <li><input type="checkbox" id="drame" value="Drame" v-model="genre" name="genre"> Drame</li>
          <li><input type="checkbox" id="espionnage" value="Espionnage" v-model="genre" name="genre"> Espionnage</li>
          <li><input type="checkbox" id="fantasy" value="Fantasy" v-model="genre" name="genre"> Fantasy</li>
          <li><input type="checkbox" id="guerre" value="Guerre" v-model="genre" name="genre"> Guerre</li>
          <li><input type="checkbox" id="horreur" value="Horreur" v-model="genre" name="genre"> Horreur</li>
          <li><input type="checkbox" id="musical" value="Musical" v-model="genre" name="genre"> Musical</li>
        </ul>
        <ul>
          <li><input type="checkbox" id="peplum" value="Péplum" v-model="genre" name="genre"> Péplum</li>
          <li><input type="checkbox" id="policier" value="Policier" v-model="genre" name="genre"> Policier</li>
          <li><input type="checkbox" id="romance" value="Romance" v-model="genre" name="genre"> Romance</li>
          <li><input type="checkbox" id="scifi" value="Science-fiction" v-model="genre" name="genre"> Science-Fiction</li>
          <li><input type="checkbox" id="thriller" value="Thriler" v-model="genre" name="genre"> Thriller</li>
          <li><input type="checkbox" id="western" value="Western" v-model="genre" name="genre"> Western</li>
        </ul>
      </p>
      <p>
        <label for="date">Date de sortie</label>
        <input type="date" id="date" v-model="date" name="date">
      </p>
      <p>
        <label for="video">Bande-Annonce</label>
        <input
          id="video"
          v-model="video"
          type="text"
          name="video"
          placeholder="https://..."
        >
      </p>
      <p>
        <label for="synopsis">Synopsis</label>
        <textarea v-model="synopsis" placeholder="Synopsis..." name="synopsis"></textarea>
      </p>
      <p>
        <label for="status">Status</label>
        <select v-model="status">
          <option disabled value="">Choisir...</option>
          <option>En attente</option>
          <option>Publié</option>
          <option>Retiré</option>
        </select>
      </p>

      <p>
        <input
          type="submit"
          value="Valider"
        >
      </p>
      <div v-if="errorSubmit" class="error"> <!-- Show the error message if there is one after submitting -->
        {{ errorSubmit }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditMovies',
  data () {
    return {
      loading: false,
      letter: 'A',
      msg0: 'jouter un film',
      msg1: 'ajouter',
      movies: null,
      error: null, /* Error during Get Ajax call */
      errorSubmit: null, /* Error during Post Ajax call */
      errors: [], /* Informations missing in the form when submitting */
      title: null,
      originalTitle: null,
      poster: [],
      durationH: null,
      durationM: null,
      producer: null,
      director: null,
      composer: null,
      casting: null,
      genre: [],
      date: null,
      video: null,
      synopsis: null,
      status: null,
      id: null
    }
  },
  created () {
    // if the route has an id param
    if (this.$route.params.id) {
      this.letter = 'M'
      this.msg0 = 'odifier un film'
      this.msg1 = 'modifier'
      // get the data when the component is created
      // and the data is already watched
      this.fetchData(this.$route.params.id)
    }
  },
  watch: {
    // call again the method if the route change
    '$route': 'fetchData'
  },
  methods: {
    async fetchData (ID) {
      this.error = this.movies = null
      this.loading = true
      axios
        .get('http://localhost:4000/movies/' + ID)
        .then(response => {
          this.title = response.data.title
          this.originalTitle = response.data.originalTitle
          this.poster = response.data.poster
          this.durationH = response.data.durationH
          this.durationM = response.data.durationM
          this.producer = response.data.producer
          this.director = response.data.director
          this.composer = response.data.composer
          this.casting = response.data.casting
          this.genre = response.data.genre
          this.date = response.data.date
          this.video = response.data.video
          this.synopsis = response.data.synopsis
          this.status = response.data.status
          this.id = response.data.id
          this.loading = false
        })
        .catch(error => { this.error = error })
    },

    checkForm: function (e) {
      if (this.title && this.durationH && this.durationM) { // if there is a title and a duration, validate submit and post
        this.sendForm()
      }

      this.errors = []

      if (!this.title) { // check is there is a title
        this.errors.push('Titre requis.')
      }
      if (!this.durationH || !this.durationM) { // check is there is a duration
        this.errors.push('Durée requise.')
      }

      e.preventDefault()
    },

    sendForm: async function (e) {
      axios.post('http://localhost:4000/movies', {
        title: this.title,
        originalTitle: this.originalTitle,
        poster: this.poster,
        durationH: this.durationH,
        durationM: this.durationM,
        producer: this.producer,
        director: this.director,
        composer: this.composer,
        casting: this.casting,
        genre: this.genre,
        date: this.date,
        video: this.video,
        synopsis: this.synopsis,
        status: this.status,
        id: this.id
      })
        .then(response => {
          console.log(response)
          this.$router.push('/films')
        })
        .catch(error => { this.errorSubmit = error })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
  width: 130px;
}
.numbers {
  width: 35px;
}
h1 {
  margin-bottom: 0;
}
h3 {
  margin-top: 0;
  margin-bottom: 50px;
  font-size: 24px;
}
/* Style the input file button, but this is ugly */
/*
input[type=file] {
  color: transparent;
}
input[type=file]::-webkit-file-upload-button {
  visibility: hidden;
}
input[type=file]::before {
  content: 'Choisir une image';
  display: inline-block;
  cursor: pointer;
  background-color: #191919;
  color: white;
  border-radius: 0.6em;
  font-size: 18px;
  border: solid 3px #D94188;
}
input[type=file]:hover::before {
  background-color: white;
  color: #D94188;
}
*/
input[type=submit] {
  background-color: #D94188;
  color: white;
  border-radius: 0.6em;
  font-size: 18px;
  border: solid 3px #2f3072;
}
input[type=submit]:hover {
  background-color: #2f3072;
  color: #D94188;
  border: solid 3px #D94188;
}
</style>
