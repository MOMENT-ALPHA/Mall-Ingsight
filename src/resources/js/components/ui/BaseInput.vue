<script setup lang="ts">
import AppIcon from "@/components/icons/AppIcon.vue";

withDefaults(
    defineProps<{
        label?: string;
        type?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        error?: string;
        helper?: string;
        icon?: string;
        autocomplete?: string;
    }>(),
    {
        type: "text",
        required: false,
        disabled: false,
    },
);

const model = defineModel<string>({ default: "" });
</script>

<template>
    <label class="flex flex-col gap-1.5">
        <span v-if="label" class="flex items-center gap-1 text-[12.5px] font-semibold text-slate-700">
            {{ label }}
            <span v-if="required" class="text-xs text-red-600">＊</span>
        </span>
        <span class="relative flex items-center">
            <AppIcon v-if="icon" :name="icon" :size="14" class="pointer-events-none absolute left-2.5 text-slate-400" />
            <input
                v-model="model"
                :type="type"
                :placeholder="placeholder"
                :disabled="disabled"
                :autocomplete="autocomplete"
                class="h-9 w-full rounded-lg border bg-white text-[13px] text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                :class="[
                    icon ? 'pl-8 pr-3' : 'px-3',
                    error ? 'border-red-600 focus:ring-[3px] focus:ring-red-600/15' : 'border-slate-300 hover:border-slate-400 focus:border-primary-500 focus:ring-[3px] focus:ring-primary-500/15',
                ]"
            />
        </span>
        <span v-if="error" class="text-[11.5px] text-red-600">{{ error }}</span>
        <span v-else-if="helper" class="text-[11.5px] text-slate-400">{{ helper }}</span>
    </label>
</template>
