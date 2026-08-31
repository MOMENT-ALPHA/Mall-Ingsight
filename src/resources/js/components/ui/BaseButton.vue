<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
        size?: "sm" | "md";
        type?: "button" | "submit";
        disabled?: boolean;
    }>(),
    {
        variant: "primary",
        size: "md",
        type: "button",
        disabled: false,
    },
);
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        class="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45"
        :class="[
            size === 'sm' ? 'h-[30px] px-3 text-[12.5px]' : 'h-9 px-4 text-[13px]',
            variant === 'primary' ? 'border-primary-600 bg-primary-600 text-white hover:border-primary-700 hover:bg-primary-700' : '',
            variant === 'secondary' ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200' : '',
            variant === 'outline' ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50' : '',
            variant === 'ghost' ? 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100' : '',
            variant === 'danger' ? 'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700' : '',
        ]"
    >
        <slot />
    </button>
</template>
