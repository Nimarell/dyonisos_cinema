import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Movies from '@/components/Movies'
import EditMovie from '@/components/EditMovie'
import Events from '@/components/Events'
import Fidelity from '@/components/Fidelity'
import Users from '@/components/Users'
import Messages from '@/components/Messages'
import Parameters from '@/components/Parameters'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/films',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/films/ajouter-film',
      name: 'AddMovie',
      component: EditMovie
    },
    {
      path: '/films/modifier-film/:id',
      name: 'EditMovie',
      component: EditMovie
    },
    {
      path: '/evenements',
      name: 'Events',
      component: Events
    },
    {
      path: '/fidelite',
      name: 'Fidelity',
      component: Fidelity
    },
    {
      path: '/utilisateurs',
      name: 'Users',
      component: Users
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/parametres',
      name: 'Parameters',
      component: Parameters
    }
  ]
})
