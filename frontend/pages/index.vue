<template>
  <div class="body">
    <div class="container">
      <div class="title">To Do App</div>
      <div class="todos">
        <div class="todos-title">All todos ({{ todos.length }})</div>
        <div class="todos_list">
          <div v-for="(todo, index) in todos" :key="todo.id" class="todo">
            <NuxtLink :to="`/${todo.id}`" class="todo__container">
              <div class="todo__title">{{ index + 1}}. {{ todo.title }}</div>
              <div class="todo__body">{{ todo.body }}</div>
              <div class="todo__date">{{ todo.date }}</div>
            </NuxtLink>
            <div class="todo__buttons">
              <input @change="" type="checkbox" :checked="todo.is_done">
              <button @click="deleteTodo(todo.id)">D</button>
            </div>
          </div>
          <div @click="isFromVisible = !isFromVisible" class="add-new-button">+ add new</div>
        </div>
      </div>

      <Transition>
        <div v-show="isFromVisible" class="add-new-form">
          <input v-model.trim="titleValue" type="text" placeholder="To Do Title">
          <input v-model.trim="bodyValue" @keyup.enter="sendNewTodo" type="text" placeholder="To Do Title">
          <button @click="sendNewTodo">Add this To Do</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const { data: data } = await useFetch('http://localhost:3000/todos')
const todos = ref(data.value.todos)

const isFromVisible = ref(false);

const titleValue = ref('');
const bodyValue = ref('');

async function sendNewTodo() {
  const todo = await $fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: { 
      title: titleValue.value, 
      body: bodyValue.value, 
      is_done: 0
    },
  })

  const { data } = await axios({method: 'get', url: 'http://localhost:3000/todos' });
  todos.value = data.todos

  titleValue.value = ''
  bodyValue.value = ''
}

async function deleteTodo(id: number) {
  const todo = await $fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
    mode: 'cors',
  })

  const { data } = await axios({method: 'get', url: 'http://localhost:3000/todos' });
  todos.value = data.todos
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

  &__container {
    flex-grow: 1;
  }

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

.add-new-button {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  color: grey;
  padding: 15px 0 0;

  cursor: pointer;
  transition: color .15s ease-in-out;
  &:hover {
    color: blue;
  }
}

.add-new-form {
  width: 500px;
  margin-top: 10px;
  border: 2px solid grey;
  border-radius: 15px;
  padding: 17px 20px;

  display: flex;
  flex-direction: column;

  input {
    flex-grow: 1;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 9px 12px;
    margin: 0 0 10px;
  }

  button {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 12px;
    cursor: pointer;
    transition: 
      background .15s ease-in-out, 
      color .15s ease-in-out;

    &:hover {
      background: rgba(0, 0, 255, 0.678);
      color: #fff;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
  </style>
  