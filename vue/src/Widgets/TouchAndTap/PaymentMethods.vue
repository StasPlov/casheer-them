<template>
    <div class="w-full bg-[var(--color-black1)]">
        <Container class="px-[7vw] py-24">
            <h2
                class="text-white text-center font-mont text-4xl font-bold"
                v-html="title"
            ></h2>

            <div class="flex flex-col py-16 w-full">
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
                    <Slide v-for="item in methodList" :key="item.id">
                        <img
                            v-if="item.image"
                            :src="item.image.url"
                            alt=""
                            draggable="false"
                            class="select-none"
                        />
                    </Slide>
                </Carousel>
            </div>
        </Container>
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

import Container from '@/Ui/Container.vue'

let curentRectWidth = ref(document.documentElement.clientWidth as number)

const isMobile = computed(() => curentRectWidth.value < 425)
const isTablet = computed(() => curentRectWidth.value < 768)
const isTabletBig = computed(() => curentRectWidth.value < 1024)

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.payments_method)

const methodList = computed<{ image: ImageInterface }>(
    () => data.value?.method_list,
)
const title = computed<string>(() => data.value?.title)

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
        return 3
    }

    return 5
})

function resize() {
    curentRectWidth.value = document.documentElement.clientWidth as number
}
</script>
