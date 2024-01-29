<template>
    <div
        class="w-full bg-[var(--color-black1)]"
        v-if="list.length && !listIsLoading"
    >
        <SimpleSlider ref="planeCarousel">
            <div
                v-for="(item, index) in list"
                :key="index"
                ref="itemsListAnim"
                class="slide"
            >
                <Plan @click="slideTo(index)" :item="item"></Plan>
            </div>
        </SimpleSlider>

        <!-- <Carousel
          ref="planeCarousel"
          v-if="list.length && !listIsLoading"
          :items-to-show="countItemsToShow"
          :wrap-around="false"
          :transition="500"
          :snapAlign="align"
          :pauseAutoplayOnHover="true"
          v-model="curentSlide"
        >
          <Slide v-for="(item, index) in list" :key="item">
            <div ref="itemsListAnim">
              <Plan @click="slideTo(index)" :item="item"> </Plan>
            </div>
          </Slide>
        </Carousel> -->

        <div class="flex justify-center" v-if="listIsLoading">
            <LoadSpiner></LoadSpiner>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'vue3-carousel/dist/carousel.css'

import StateInterface from '@/Store/Modules/Plane/StateInterface'

import LoadSpiner from '@/Components/LoadSpiner.vue'

import SimpleSlider from '@/Ui/SimpleSlider.vue'

import Plan from './Plan/Plan.vue'
import PlanInterface from './Plan/Type/PlanInterface'

gsap.registerPlugin(ScrollTrigger)

const store = useStore<RootStateInterface>()
const props = defineProps<{
    list: Array<PlanInterface>
}>()

let curentRectWidth = ref(document.documentElement.clientWidth as number)
let planeCarousel = ref(null)
let curentSlide = ref(0)
let itemsListAnim = ref([])

const listIsLoading = computed(
    () => (store.state.plane as StateInterface).planeListIsLoading,
)

const isEvenList = computed(() => props.list.length % 2 === 0) // Четное ли кол-во элэментов
// const isMobile = computed(() => curentRectWidth.value < 425)
// const isTablet = computed(() => curentRectWidth.value < 768)
// const isTabletBig = computed(() => curentRectWidth.value < 1024)
// const isMonitBig = computed(() => curentRectWidth.value < 1840)
// return (!isEvenList.value && curentSlide.value === 0) ? 1 : 2;
// const countItemsToShow = computed(() => {
//     if (isMobile.value) {
//         return 1
//     }
//
//     if (isTablet.value) {
//         return 1
//     }
//
//     if (isTabletBig.value) {
//         return 3
//     }
//
//     if (isMonitBig.value) {
//         return 3
//     }
//
//     if (props.list.length <= 2) {
//         return props.list.length
//     }
//
//     return 3
// })
//
// const align = computed(() => {
//     return 'start'
// })

window.addEventListener('resize', () => {
    resize()
})

watchEffect(
    () => {
        animateItemList()
    },
    { flush: 'post' },
)

function resize() {
    curentRectWidth.value = document.documentElement.clientWidth as number
}

function slideTo(val: any) {
    curentSlide.value = val
    console.log(isEvenList.value, curentSlide.value)
}

function animateItemList() {
    gsap.utils.toArray<any>(itemsListAnim.value).forEach((element, i) => {
        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: '20%',
            },
            {
                opacity: 1,
                autoAlpha: 1,
                delay: i * 0.25,
                duration: 2,
                y: 0,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reset',
                },
            },
        )
    })
}
</script>

<style scoped lang="scss">
.slide {
    min-width: 450px;
    width: auto;
    max-width: 500px;

    @media (max-width: 1440px) {
        width: calc(100% / 3);
        min-width: 400px;
    }

    @media (max-width: 1024px) {
        min-width: 350px;
    }

    @media (max-width: 768px) {
        min-width: 300px;
    }

    @media (max-width: 640px) {
        min-width: 384px;
    }

    @media (max-width: 425px) {
        min-width: fit-content;
        width: 100%;
    }
}
</style>
