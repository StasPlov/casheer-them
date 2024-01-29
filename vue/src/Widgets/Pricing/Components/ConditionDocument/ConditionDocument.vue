<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white px-10 py-8 border border-solid border-[var(--color-arctic1)] rounded-3xl overflow-hidden"
        >
            <div class="pr-10 max-h-screen h-[38.8125rem] overflow-y-auto">
                <span
                    class="text-black font-[Arial] font-normal"
                    v-html="item.document"
                ></span>
            </div>
        </div>

        <template v-if="isAgree">
            <a
                :href="item.button.link"
                v-if="item.button && item.button.is_active"
                class="ml-[2.5rem] self-start"
                :class="{
                    'ml-auto mr-[2.5rem]': alignment === 'right',
                }"
            >
                <Button
                    class="!bg-transparent btn relative !py-3 !px-12 w-[180px] hover:scale-105 duration-500"
                >
                    <span
                        class="text-[var(--color-blue1)] text-base font-[Arial] font-normal"
                        >{{ item.button.text }}</span
                    >
                </Button>
            </a>
        </template>

        <Button
            v-else
            class="!bg-transparent btn relative !py-3 !px-12 w-[180px] hover:scale-105 duration-500 self-start"
            :class="{
                'select-none opacity-50': !isAgree,
                'ml-auto mr-[2.5rem]': alignment === 'right',
                'ml-[2.5rem]': alignment === 'left',
            }"
        >
            <span
                class="text-[var(--color-blue1)] text-base font-[Arial] font-normal"
                >{{ item.button.text }}</span
            >
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Button from '@/Ui/Button.vue'

import ConditionDocumentInterface from './Type/ConditionDocumentInterface'

const props = defineProps<{
    item: ConditionDocumentInterface
    isAgree?: boolean
    alignment?: 'left' | 'right'
}>()

const alignment = computed(() => props.alignment ?? 'left')
</script>

<style scoped>
.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 5px solid transparent;
    background: radial-gradient(var(--color-blue1), transparent) border-box;
    mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}
</style>
