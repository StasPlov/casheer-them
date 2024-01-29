<template>
    <div class="bg-white rounded-3xl">
        <div class="px-8 py-9 flex flex-col gap-9">
            <div class="flex flex-col gap-6">
                <h3
                    class="text-transparent text-[2.5rem] font-medium font-mont bg-clip-text bg-gradient-casheer-title-to-b"
                    v-if="title"
                    v-html="title"
                ></h3>
                <span
                    class="text-black text-2xl font-[Arial] font-normal"
                    v-if="description"
                    v-html="description"
                ></span>
            </div>

            <ul
                class="grid grid-cols-2 grid-flow-row gap-8 justify-between max-md:grid-cols-1"
            >
                <li>
                    <DocumentList
                        :items="list.filter((_, index) => index % 2 === 0)"
                    />
                </li>
                <li>
                    <DocumentList
                        :items="list.filter((_, index) => index % 2 !== 0)"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import DocumentList from '@/Widgets/Pricing/Components/DocumentList/DocumentList.vue'

import DocumentInterface from './Type/DocumentInterface'

const props = defineProps<{
    item: DocumentInterface
}>()
const title = computed(() => props.item.title ?? null)
const description = computed(() => props.item.description ?? null)
const list = computed(() => props.item?.list ?? [])
</script>
