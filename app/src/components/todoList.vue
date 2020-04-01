<template>
    <div class="todos">
      <h2><em>L</em>iste des tâches à faire</h2>
      <hr>
      <input type="text" class="new-todo" v-model="newTodo" placeholder="Ajouter une tache" @keyup.enter="addTodo">
      <ul>
          <li v-for="todo in todos" :key="todo.name">
              <input type="checkbox" :id="todo.name" style="display: none;" v-model="todo.completed">
              <label :for="todo.name" class="check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
              <label class="todo" :class="{done: todo.completed}">{{ todo.name }}</label>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'todoList',
  data () {
    return {
      todos: [{
        name: 'Valider les films en attentes',
        completed: false
      }, {
        name: 'Lier les données au graphique camembert',
        completed: false
      }, {
        name: 'Trouver un graphique camembert à intégrer au tableau de bord',
        completed: true
      }],
      newTodo: ''
    }
  },
  methods: {
    addTodo: function () {
      this.todos.push({
        completed: false,
        name: this.newTodo
      })
    }
  }
}
</script>

<style scoped>
h2 {
    margin-left: 1em;
}
.todos {
  position: relative;
  background-color: #ffffff;
  border-radius: 15px;
  border: solid 1px #D94188;
  box-shadow: 1px 1px 1px grey;
  width: 100%;
}
.todos:hover {
  background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(217, 65, 136, 0.05))
}
.new-todo {
  border: none;
  font-size: 1em;
  padding: 16px;
  background-color: transparent;
  width: 98%;
}
.done {
    color:#D94188;
}
ul {
    margin-left: 1em;
}
ul li {
    margin-bottom: 1em;
}
.todo {
    font-size: 1.3em;
    font-weight: bold;
    margin-left: 0.5em;
}
.check {
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 18px;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}
.check:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(34,50,84,0.03);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.check svg {
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #c8ccd4;
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
}
.check svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}
.check svg polyline {
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
}
.check:hover:before {
  opacity: 1;
}
.check:hover svg {
  stroke: #4285f4;
}
input[type=checkbox]:checked + .check svg {
  stroke: #4285f4;
}
input[type=checkbox]:checked + .check svg path {
  stroke-dashoffset: 60;
  transition: all 0.3s linear;
}
input[type=checkbox]:checked + .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.2s linear;
  transition-delay: 0.15s;
}
input[type=text]:focus {
  outline: none;
}
</style>
