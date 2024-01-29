<template>
    <div class="w-full bg-[var(--color-black1)] relative pb-28 root">
        <div class="py-9 max-sm:py-[100px]">
            <h2
                class="text-white text-center font-mont text-4xl font-bold"
                v-html="title"
            ></h2>
        </div>

        <div class="flex flex-col gap-5 bg-white py-16 w-full">
            <Carousel
                :items-to-show="countItemsToShow"
                :wrap-around="true"
                :transition="5000"
                :snapAlign="'start'"
                :pauseAutoplayOnHover="true"
                :autoplay="1"
                :mouseDrag="false"
                :touchDrag="false"
            >
                <Slide v-for="item in list" :key="item.image.id">
                    <a :href="item.link" v-if="item.link">
                        <img
                            :src="item.image.url"
                            alt=""
                            draggable="false"
                            class="select-none"
                        />
                    </a>

                    <div class="imageWrapper" v-else>
                        <img
                            :src="item.image.url"
                            alt=""
                            draggable="false"
                            class="select-none"
                        />
                    </div>
                </Slide>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

let curentRectWidth = ref(document.documentElement.clientWidth as number)

const isMobile = computed(() => curentRectWidth.value < 425)
const isTablet = computed(() => curentRectWidth.value < 768)
const isTabletBig = computed(() => curentRectWidth.value < 1024)

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.trusted_by)

const title = computed<string>(() => data.value?.title)
const list = computed<
    Array<{
        image: ImageInterface
        link: string
    }>
>(() => data.value?.list)

window.addEventListener('resize', () => {
    resize()
})

const countItemsToShow = computed(() => {
    if (isMobile.value) {
        return 2
    }

    if (isTablet.value) {
        return 2
    }

    if (isTabletBig.value) {
        return 4
    }

    return 6
})

function resize() {
    curentRectWidth.value = document.documentElement.clientWidth as number
}
</script>

<style scoped>
.root {
    :global(.carousel__track) {
        transition-timing-function: linear !important;
    }
}

.imageWrapper {
    display: block;
    padding: 0 32px;
}
</style>
