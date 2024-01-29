<template>
    <ul class="flex flex-col gap-5">
        <li v-for="(item, index) in list" :key="index">
            <div class="flex gap-4">
                <div class="flex-shrink-0">
                    <CheckIcon
                        v-if="item.is_active"
                        class="w-[inherit]"
                    ></CheckIcon>
                    <CheckNoneIcon v-else class="w-[inherit]"></CheckNoneIcon>
                </div>

                <span
                    class="text-black text-xl font-[Arial] font-normal"
                    v-html="item.description"
                ></span>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CheckIcon from '@/Widgets/Pricing/Assets/CheckIcon.vue'
import CheckNoneIcon from '@/Widgets/Pricing/Assets/CheckNoneIcon.vue'

import DocumentListInterface from './Type/DocumenListInterface'

const props = defineProps<{
    items: DocumentListInterface
}>()
const list = computed(() => props.items)
</script>
