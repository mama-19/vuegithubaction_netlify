<template>
    <div style="width: 380px; margin: 0 auto;">
        <h1 class="h2 mt-5">CDL - To Do List Github Action</h1>

        <form class="mt-5" @submit.prevent="onClickAdd()">
            <div class="d-flex">
                <input type="text" 
                    class="form-control rounded-end-0" 
                    v-model="state.task_name">
                <button class="btn btn-primary rounded-start-0">
                    {{ state.selected_id == 0 ? 'Add' : 'Update' }}
                </button>
            </div>
        </form>

        <ul class="list-group mt-5">
            <li v-for="task in homeStore.tasks" :key="task.id" class="list-group-item">
                <div class="d-flex justify-content-between">
                    <span :class="{'text-decoration-line-through': task.is_completed}">{{ task.id }}. {{ task.name }}</span>
                    <div class="d-flex gap-2">
                        <a v-show="!task.is_completed" role="button" @click="onClickEdit(task.name, task.id)">
                            <i class="bi bi-pencil-square"></i>
                        </a>
                        <a role="button" class="text-danger" @click="onClickDelete(task.id)">
                            <i class="bi bi-trash3"></i>
                        </a>
                        <a v-show="!task.is_completed" role="button" @click="onClickComplete(task.id)">
                            <i class="bi bi-check2-circle"></i>
                        </a>
                        <a v-show="task.is_completed" role="button" @click="onClickReset(task.id)">
                            <i class="bi bi-x-circle"></i>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import { useHomeStore } from '@/stores/views/home_store'

const homeStore = useHomeStore()
const state = reactive({
    task_name: '',
    selected_id: 0
})

const onClickAdd = () => {
    if (state.selected_id == 0)
    {
        let nextID = 1;
        if (homeStore.tasks.length > 0) {
            let ids = homeStore.tasks.map((item) => item.id)
            nextID = Math.max(...ids) + 1
        }
        
        homeStore.tasks.push({
            id: nextID,
            name: state.task_name,
            is_completed: false
        })
    } 
    else 
    {
        let index = homeStore.tasks.findIndex((item) => item.id == state.selected_id)
        homeStore.tasks[index].name = state.task_name
        state.selected_id = 0
    }
    state.task_name = ''
}

const onClickComplete = (id) => {
    // Javascript ES6
    let index = homeStore.tasks.findIndex((item) => item.id == id)
    homeStore.tasks[index].is_completed = true
}

const onClickReset = (id) => {
    let index = homeStore.tasks.findIndex((item) => item.id == id)
    homeStore.tasks[index].is_completed = false
}

const onClickEdit = (name, id) => {
    state.task_name = name
    state.selected_id = id
}

const onClickDelete = (id) => {
    homeStore.selected_id = id
    homeStore.mdl_confirm.show()
}
</script>