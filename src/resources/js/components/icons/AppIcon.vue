<script setup lang="ts">
type IconShape =
    | { tag: "path"; attrs: { d: string } }
    | { tag: "rect"; attrs: { x: number; y: number; width: number; height: number; rx?: number } }
    | { tag: "circle"; attrs: { cx: number; cy: number; r: number } }
    | { tag: "ellipse"; attrs: { cx: number; cy: number; rx: number; ry: number } };

const icons: Record<string, IconShape[]> = {
    home: [
        { tag: "path", attrs: { d: "M3 11.5 12 4l9 7.5" } },
        { tag: "path", attrs: { d: "M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" } },
    ],
    upload: [
        { tag: "path", attrs: { d: "M12 3v11" } },
        { tag: "path", attrs: { d: "M8 8l4-4 4 4" } },
        { tag: "path", attrs: { d: "M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" } },
    ],
    "bar-chart": [
        { tag: "rect", attrs: { x: 4, y: 12, width: 3, height: 8, rx: 1 } },
        { tag: "rect", attrs: { x: 10.5, y: 6, width: 3, height: 14, rx: 1 } },
        { tag: "rect", attrs: { x: 17, y: 9, width: 3, height: 11, rx: 1 } },
    ],
    "trending-up": [
        { tag: "path", attrs: { d: "M3 17l6-6 4 4 8-9" } },
        { tag: "path", attrs: { d: "M15 6h6v6" } },
    ],
    target: [
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 8 } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 4.5 } },
        { tag: "circle", attrs: { cx: 12, cy: 12, r: 1 } },
    ],
    columns: [
        { tag: "rect", attrs: { x: 4, y: 4, width: 6, height: 16, rx: 1 } },
        { tag: "rect", attrs: { x: 14, y: 4, width: 6, height: 16, rx: 1 } },
    ],
    box: [
        { tag: "path", attrs: { d: "M3 8l9-4 9 4-9 4-9-4z" } },
        { tag: "path", attrs: { d: "M3 8v8l9 4 9-4V8" } },
        { tag: "path", attrs: { d: "M12 12v8" } },
    ],
    layers: [
        { tag: "path", attrs: { d: "M12 3l9 5-9 5-9-5 9-5z" } },
        { tag: "path", attrs: { d: "M3 13l9 5 9-5" } },
    ],
    database: [
        { tag: "ellipse", attrs: { cx: 12, cy: 5.5, rx: 8, ry: 3 } },
        { tag: "path", attrs: { d: "M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" } },
        { tag: "path", attrs: { d: "M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" } },
    ],
    sliders: [
        { tag: "path", attrs: { d: "M4 6h9" } },
        { tag: "path", attrs: { d: "M17 6h3" } },
        { tag: "circle", attrs: { cx: 14, cy: 6, r: 2 } },
        { tag: "path", attrs: { d: "M4 12h3" } },
        { tag: "path", attrs: { d: "M11 12h9" } },
        { tag: "circle", attrs: { cx: 8, cy: 12, r: 2 } },
        { tag: "path", attrs: { d: "M4 18h9" } },
        { tag: "path", attrs: { d: "M17 18h3" } },
        { tag: "circle", attrs: { cx: 14, cy: 18, r: 2 } },
    ],
    history: [
        { tag: "path", attrs: { d: "M3 12a9 9 0 1 0 3-6.7" } },
        { tag: "path", attrs: { d: "M3 4v5h5" } },
        { tag: "path", attrs: { d: "M12 7v5l4 2" } },
    ],
    "chevron-right": [{ tag: "path", attrs: { d: "M9 6l6 6-6 6" } }],
    "chevron-down": [{ tag: "path", attrs: { d: "M6 9l6 6 6-6" } }],
    menu: [
        { tag: "rect", attrs: { x: 3, y: 4, width: 18, height: 16, rx: 2 } },
        { tag: "path", attrs: { d: "M9 4v16" } },
    ],
    bell: [
        { tag: "path", attrs: { d: "M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" } },
        { tag: "path", attrs: { d: "M10 19a2 2 0 0 0 4 0" } },
    ],
    search: [
        { tag: "circle", attrs: { cx: 10.5, cy: 10.5, r: 6.5 } },
        { tag: "path", attrs: { d: "M20 20l-5-5" } },
    ],
    calendar: [
        { tag: "rect", attrs: { x: 3.5, y: 5, width: 17, height: 16, rx: 2 } },
        { tag: "path", attrs: { d: "M3.5 10h17" } },
        { tag: "path", attrs: { d: "M8 3v4" } },
        { tag: "path", attrs: { d: "M16 3v4" } },
    ],
};

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 18 });
</script>

<template>
    <span v-if="!icons[props.name]" class="material-symbols-outlined" :style="{ fontSize: `${props.size}px` }" aria-hidden="true">{{ props.name }}</span>
    <svg v-else :width="props.size" :height="props.size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <component :is="shape.tag" v-for="(shape, index) in icons[props.name]" :key="index" v-bind="shape.attrs" />
    </svg>
</template>
