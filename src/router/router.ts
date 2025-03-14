import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/components/views/HomeView.vue";
import AboutView from "@/components/views/AboutView.vue";
import AddView from "@/components/views/AddView.vue";




const routes = [
    { path: '/', component: HomeView },
    { path: '/add', component: AddView },
    { path: '/about', component: AboutView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})