<template>
    <div class="root overflow-hidden overflow-x-auto">
        <component
            :is="sliderTag"
            :class="sliderClass"
            ref="slider"
            class="flex slider"
            @mousedown="mousedown"
            @mouseleave="mouseleave"
            @mousemove="mousemove"
            @mouseup="mouseup"
        >
            <slot>Нет элементов</slot>
        </component>
        <!--   Навигационные кнопки, доделать     -->
        <!--        <div class="buttonContainer">-->
        <!--            <button-->
        <!--                class="navigationButton nextButton"-->
        <!--                type="button"-->
        <!--                v-on:click="() => handleNavigationClick('next')"-->
        <!--            ></button>-->
        <!--            <button-->
        <!--                class="navigationButton prevButton"-->
        <!--                type="button"-->
        <!--                v-on:click="() => handleNavigationClick('next')"-->
        <!--            ></button>-->
        <!--        </div>-->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    /**
     * @description HTML тег слайдера
     */
    sliderTag: {
        type: String,
        default: 'div',
        require: false,
    },
    /**
     * @description CSS Классы слайдера
     */
    sliderClass: {
        type: String,
        default: '',
        require: false,
    },
})

const slider = ref<HTMLDivElement | null>(null)
let isDown = ref(false)
let startX = ref(0)
let scrollLeft = ref(0)
let walk = ref(0)

function mousedown(e: MouseEvent) {
    isDown.value = true
    if (slider.value === null) return
    slider.value.classList.add('active')
    startX.value = e.pageX - slider.value.offsetLeft
    scrollLeft.value = slider.value.scrollLeft

    if (walk.value > 0 && isDown.value) {
        return
    }

    const target = e.target as HTMLElement
    if (
        Array.from((slider.value as ParentNode).children).find(
            i => i === target,
        )
    ) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        })
    }
}

function mouseleave(e: MouseEvent) {
    isDown.value = false
    slider.value?.classList.remove('active')
}

function mouseup(e: MouseEvent) {
    isDown.value = false
    slider.value?.classList.remove('active')
}

function mousemove(e: MouseEvent) {
    if (!isDown.value) return
    e.preventDefault()
    if (slider.value === null) return
    const x = e.pageX - slider.value.offsetLeft
    walk.value = (x - startX.value) * 1 //scroll-fast
    slider.value.scrollLeft = scrollLeft.value - walk.value
    console.log(walk.value)
}

// function handleNavigationClick(direction: 'next' | 'prev') {
//     console.log(direction)
// }
</script>

<style scoped lang="scss">
.slider {
    padding: 0.75rem 68px;
    gap: 60px;
    width: fit-content;
    margin: 0 auto;

    @media (max-width: 1439px) {
        padding: 0.75rem 56px;
        gap: 48px;
    }

    @media (max-width: 1024px) {
        padding: 0.75rem 44px;
        gap: 36px;
    }

    @media (max-width: 768px) {
        padding: 0.75rem 32px;
        gap: 24px;
    }

    @media (max-width: 640px) {
        padding: 0.75rem 24px;
        gap: 16px;
    }

    @media (max-width: 425px) {
        padding: 0.75rem 4px;
        gap: 4px;
    }

    div {
        min-width: max-content;
    }
}
.root {
    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
