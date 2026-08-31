<script setup lang="ts">
import { ref } from "vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";

const sidebarCollapsed = ref(false);
</script>

<template>
    <div class="flex h-screen flex-col overflow-hidden bg-slate-50">
        <AppHeader :collapsed="sidebarCollapsed" @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
        <div class="flex min-h-0 flex-1">
            <AppSidebar :collapsed="sidebarCollapsed" />
            <main class="flex-1 overflow-y-auto p-6 lg:p-8">
                <router-view v-slot="{ Component }">
                    <transition name="page" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>
