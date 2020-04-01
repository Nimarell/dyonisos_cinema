<template>
  <div class="navtop">
    <a v-bind:href='weblink' target="_blank" class='backlink'>Retour vers le site >></a>
  </div>
</template>

<script>
export default {
  name: 'NavigationTop',
  data () {
    return {
      weblink: 'https://nimarell.github.io/resume'
    }
  }
}
</script>

<style>
    .navtop {
        height: 50px;
        width: 100%;
        background-color: #191919;
        color: white;
        position: fixed;
        left: 0;
        top: 0;
        padding-left: 220px; /* = SideMenu width */
    }
    .backlink {
        float: right;
        padding-right: 245px; /* navtop padding-left + 25px */
        line-height: 50px;
    }
</style>
