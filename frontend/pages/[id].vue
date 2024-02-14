<template>
    <div class="body">
      <div class="container">
        <div class="title">To Do App</div>

        <div class="todos">
          <div class="todos_list">
            <div class="todo">
              <div>
                <div class="todo__title">{{ todo.title }}</div>
                <div class="todo__body">{{ todo.body }}</div>
                <div class="todo__date">{{ todo.date }}</div>
              </div>
              <div class="todo__buttons">
                <input type="checkbox" :checked="todo.is_done">
                <button @click="deleteTodo(todo.id)">D</button>
              </div>
            </div>
          </div>
        </div>

        <nuxt-link to="/" class="ling-to-main-page">Вернуться к списку заметок</nuxt-link>

      </div>
    </div>
  </template>
  
<script setup lang="ts">
import axios from 'axios';
const router = useRouter()
const route = useRoute()

const id = route.params.id

const { data: data } = await useFetch(`http://localhost:3000/todos/${id}`)
const todo = ref(data.value.todo)

async function deleteTodo(id: number) {
const todo = await $fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
    mode: 'cors',
})

    router.back()
}

</script>
  
  <style lang="scss">
  .body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
  
  .title {
    font-size: 25px;
    padding: 0 0 10px;
    text-align: center;
  }
  
  .todos {
    width: 500px;
    border: 2px solid grey;
    border-radius: 15px;
    padding: 17px 20px;
  }
  
  .todo {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0;
  
    &__title {
      font-size: 20px;
      font-weight: 600;
    }
  
    &__body {
      padding: 2px 0 5px;
    }
  
    &__buttons {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      padding: 0 0 0 5px;
      gap: 5px;
      input {
        width: 30px;
        height: 30px;
        margin: 0;
      }
  
      button {
        width: 30px;
        height: 30px;
      }
    }
  }

  .ling-to-main-page {
    display: block;
    padding: 30px 0 0;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    color: grey;
  }
    </style>
    