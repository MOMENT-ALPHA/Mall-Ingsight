<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import AppIcon from "@/components/icons/AppIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect, { type SelectOption } from "@/components/ui/BaseSelect.vue";

const route = useRoute();
const pageTitle = computed(() => (route.meta.title as string | undefined) ?? "");
const groupLabel = computed(() => (route.meta.group as string | undefined) ?? "");

const category = ref("all");
const warehouse = ref("all");
const status = ref("all");
const keyword = ref("");

const categoryOptions: SelectOption[] = [
    { label: "すべて", value: "all" },
    { label: "化粧品", value: "cosmetics" },
    { label: "生活雑貨", value: "goods" },
    { label: "食品", value: "food" },
];
const warehouseOptions: SelectOption[] = [
    { label: "すべて", value: "all" },
    { label: "自社倉庫", value: "own" },
    { label: "FBA倉庫", value: "fba" },
];
const statusOptions: SelectOption[] = [
    { label: "すべて", value: "all" },
    { label: "販売中", value: "active" },
    { label: "販売終了", value: "discontinued" },
];
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <h1 class="text-[19px] font-bold text-slate-900">{{ pageTitle }}</h1>
            <p class="mt-0.5 text-[12.5px] text-slate-500">{{ groupLabel }} の一覧を表示します。基準日 2026-08-31 時点</p>
        </div>

        <div class="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
            <BaseSelect v-model="category" label="カテゴリー" :options="categoryOptions" class="w-37.5" />
            <BaseSelect v-model="warehouse" label="倉庫区分" :options="warehouseOptions" class="w-37.5" />
            <BaseSelect v-model="status" label="販売状態" :options="statusOptions" class="w-37.5" />
            <BaseInput v-model="keyword" label="SKU・品番" placeholder="検索" icon="search" class="w-47.5" />
            <div class="flex-1" />
            <BaseButton variant="outline" size="sm">リセット</BaseButton>
            <BaseButton variant="primary" size="sm">適用</BaseButton>
        </div>

        <div class="flex flex-1 flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-slate-300 bg-white py-24">
            <AppIcon name="layers" :size="26" class="text-slate-300" />
            <p class="text-[12.5px] text-slate-400">この下に「{{ pageTitle }}」のテーブル・グラフ等のコンテンツが表示されます</p>
        </div>
    </div>
</template>
