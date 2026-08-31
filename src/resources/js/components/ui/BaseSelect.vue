<script setup lang="ts">
import AppIcon from "@/components/icons/AppIcon.vue";

export interface SelectOption {
    label: string;
    value: string;
}

withDefaults(
    defineProps<{
        label?: string;
        options: SelectOption[];
        disabled?: boolean;
    }>(),
    {
        disabled: false,
    },
);

const model = defineModel<string>({ default: "" });
</script>

<template>
    <label class="flex flex-col gap-1.5">
        <span v-if="label" class="text-[12.5px] font-semibold text-slate-700">{{ label }}</span>
        <span class="relative flex items-center">
            <select
                v-model="model"
                :disabled="disabled"
                class="h-9 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pr-8 text-[13px] text-slate-900 outline-none hover:border-slate-400 focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            >
                <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <AppIcon name="chevron-down" :size="14" class="pointer-events-none absolute right-2.5 text-slate-400" />
        </span>
    </label>
</template>
