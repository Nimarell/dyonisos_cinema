<template>
  <div id="app">
    <NavigationSide/>
    <NavigationTop/>
    <router-view class="content"/>
  </div>
</template>

<script>
import NavigationSide from '@/components/NavigationSide'
import NavigationTop from '@/components/NavigationTop'

export default {
  components: { NavigationSide, NavigationTop },
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'GeosansLight';
  src: url('css/fonts/GeosansLight.ttf');
}
@font-face {
  font-family: 'Ubahn';
  src: url('css/fonts/Ubahn.ttf');
}
#app {
  font-family: 'GeosansLight';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #191919;
}
h1, h2 {
  font-family: 'Ubahn';
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #D94188;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  font-style: italic;
}
.content {
  padding-left: 250px;
  padding-top: 50px;
}
em {
  color: #D94188;
  font-style: normal;
}
button {
  background-color: #191919;
  color: white;
  border-radius: 0.6em;
  font-size: 18px;
  border: solid 3px #D94188;
}
button:hover {
  background-color: white;
  color: #D94188;
}
</style>
