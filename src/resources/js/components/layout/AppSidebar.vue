<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { navigation, topLevelPages } from "@/data/navigation";
import AppIcon from "@/components/icons/AppIcon.vue";

defineProps<{ collapsed: boolean }>();

const route = useRoute();
const expanded = reactive<Record<string, boolean>>({});

function groupContaining(screenId: string | undefined) {
    return navigation.find((group) => group.pages.some((page) => page.id === screenId));
}

function syncExpandedWithRoute(): void {
    const activeGroup = groupContaining(route.name?.toString());
    if (activeGroup) {
        expanded[activeGroup.id] = true;
    }
}

syncExpandedWithRoute();
watch(() => route.name, syncExpandedWithRoute);

function toggleGroup(groupId: string): void {
    expanded[groupId] = !expanded[groupId];
}
</script>

<template>
    <nav class="flex shrink-0 flex-col gap-px overflow-y-auto border-r border-slate-200 bg-white px-2 py-2.5 transition-[width] duration-150" :class="collapsed ? 'w-19' : 'w-66'">
        <router-link
            v-for="page in topLevelPages"
            :key="page.id"
            :to="page.path"
            class="flex h-9.5 items-center gap-3 rounded-lg px-2.5 hover:bg-slate-100"
            :class="route.path === page.path ? 'bg-primary-50' : ''"
        >
            <AppIcon :name="page.icon" :size="18" class="shrink-0" :class="route.path === page.path ? 'text-primary-700' : 'text-slate-600'" />
            <span v-if="!collapsed" class="text-[13px] font-semibold" :class="route.path === page.path ? 'text-primary-700' : 'text-slate-700'">{{ page.label }}</span>
        </router-link>

        <div v-for="group in navigation" :key="group.id" class="flex flex-col">
            <button
                type="button"
                class="flex h-9.5 items-center gap-3 rounded-lg px-2.5 text-left hover:bg-slate-100"
                :class="expanded[group.id] && !collapsed ? 'bg-slate-50' : ''"
                @click="toggleGroup(group.id)"
            >
                <AppIcon :name="group.icon" :size="18" class="shrink-0 text-slate-600" />
                <span v-if="!collapsed" class="flex flex-1 items-center justify-between gap-2">
                    <span class="text-[13px] font-semibold text-slate-700">{{ group.label }}</span>
                    <AppIcon name="chevron-right" :size="14" class="text-slate-400 transition-transform duration-150" :class="expanded[group.id] ? 'rotate-90' : ''" />
                </span>
            </button>

            <div v-if="expanded[group.id] && !collapsed" class="mt-px flex flex-col gap-px pl-4">
                <router-link
                    v-for="page in group.pages"
                    :key="page.id"
                    :to="page.path"
                    class="block rounded-md py-1.5 pl-6 pr-3 text-[12.5px] text-slate-600 hover:bg-slate-100"
                    :class="route.path === page.path ? 'bg-primary-50 font-semibold text-primary-700 hover:bg-primary-50' : ''"
                >
                    {{ page.label }}
                </router-link>
            </div>
        </div>
    </nav>
</template>
