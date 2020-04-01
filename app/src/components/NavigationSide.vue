<template>
  <div class="aside">
    <img src="../assets/DyonisosNoir.png" class="logo">
    <div class="profile">
      <font-awesome-icon icon="user" class="usericon" />
      <h2>{{ userName }}</h2>
      <h3>{{ userRole }}</h3>
      <a>Déconnexion >></a>
    </div>
    <ul>
      <router-link to="/" exact tag="li"><font-awesome-icon icon="th-large" class="menuicon" /> Tableau de bord</router-link>
      <router-link to="/films" tag="li"><font-awesome-icon icon="film" class="menuicon" /> Films</router-link>
      <router-link to="/evenements" tag="li"><font-awesome-icon icon="calendar-alt" class="menuicon" /> Evènements</router-link>
      <router-link to="/fidelite" tag="li"><font-awesome-icon icon="award" class="menuicon" /> Fidélité</router-link>
      <router-link to="/utilisateurs" tag="li"><font-awesome-icon icon="users-cog" class="menuicon" /> Utilisateurs</router-link>
      <router-link to="/messages" tag="li"><font-awesome-icon icon="envelope" class="menuicon" /> Messages</router-link>
      <router-link to="/parametres" tag="li"><font-awesome-icon icon="cog" class="menuicon" /> Paramètres</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavigationSide',
  data () {
    return {
      userName: 'admin',
      userRole: 'Administrateur'
    }
  }
}
</script>

<style scoped>
    .aside {
        height: 100%;
        width: 220px;
        background-color: #191919;
        color: white;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
    }
    li {
      padding-left: 15px;
      margin-bottom: 15px;
      font-size: 24px;
      border-bottom: 4px solid #9fa3a5;
    }
    li:hover {
      border-bottom: 4px solid #2f3072;
      cursor: pointer;
    }
    li:active {
      border-bottom: 4px solid #D94188;
    }
    li.router-link-active {
      border-bottom: 4px solid #D94188;
    }
    .logo {
      width: 75%;
      padding-top: 25px;
      padding-left: 25px;
    }
    .usericon {
      background-color: #2f3072;
      border-radius: 50%;
      color: #D94188;
      font-size: 35px;
      padding: 10px;
      float: right;
    }
    .profile {
      padding: 15px;
    }
    h1, h2, h3 {
      margin: 0;
      text-align: right;
      padding-right: 60px;
    }
    a {
      float: right;
      padding-right: 10px;
      cursor: pointer;
    }
    .menuicon {
      width: 30px;
    }
</style>
