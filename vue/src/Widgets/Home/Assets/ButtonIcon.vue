<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
    >
        <circle
            cx="20"
            cy="20"
            r="17.5"
            :stroke="`url(#icon-button-gradient-${id})`"
            stroke-width="5"
        />
        <path
            d="M17 26.8633L23 19.8365L17 12.8097"
            stroke="white"
            stroke-width="2.89231"
            stroke-linecap="round"
        />
        <defs>
            <radialGradient
                :id="`icon-button-gradient-${id}`"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(20 20) rotate(90) scale(20)"
            >
                <stop :stop-color="colorCode" />
                <stop offset="1" :stop-color="colorCode" stop-opacity="0.1" />
            </radialGradient>
        </defs>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    color: string
    id: number
}>()

const colorCode = computed(() => props.color)
const id = computed(() => props.id)
</script>
