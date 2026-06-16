import {defineStore} from 'pinia'

export const useHomeStore = defineStore('views/home_store', {
    state: () => ({
        mdl_confirm: null,
        tasks: [
            {id: 1, name: 'Go count down', is_completed: false},
            {id: 2, name: 'Go home', is_completed: true},
            {id: 3, name: 'Buy new computer', is_completed: false},
            {id: 4, name: 'Buy new cloth', is_completed: false},
            {id: 5, name: 'Buy new moto', is_completed: true},
        ],
        selected_id: 0
    }),
    actions: {
        welcome() {
            alert('Hi')
        }
    }
})