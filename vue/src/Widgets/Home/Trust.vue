<template>
    <div class="w-full bg-white relative root">
        <Container
            class="pt-[74px] pb-[98px] max-sm:pb-[44px] flex flex-col gap-32"
        >
            <div class="flex flex-col gap-5">
                <h2
                    class="text-black text-center font-mont text-3xl font-bold"
                    v-html="paymentMethodsTitle"
                ></h2>

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
                    <Slide
                        v-for="item in paymentMethodsList"
                        :key="item.image.id"
                    >
                        <img
                            :src="item.image.url"
                            alt=""
                            draggable="false"
                            class="select-none"
                        />
                    </Slide>
                </Carousel>
            </div>

            <div class="flex flex-col gap-24">
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col gap-4">
                        <h2
                            class="text-black text-center font-mont text-5xl font-bold"
                            v-html="title"
                        ></h2>
                        <span
                            class="text-black text-2xl font-normal font-[Arial] text-center"
                            v-html="subTitle"
                        ></span>
                    </div>

                    <ul class="flex gap-8 justify-center">
                        <li v-for="item in trustList" :key="item.image.id">
                            <img
                                :src="item.image.url"
                                alt=""
                                class="select-none"
                                draggable="false"
                            />
                        </li>
                    </ul>
                </div>

                <div class="self-center">
                    <ul
                        class="grid grid-rows-4 grid-flow-col gap-8 gap-x-40 max-sm:gap-x-10 max-phoneX:flex max-phoneX:flex-col"
                    >
                        <li
                            v-for="item in certificateList"
                            :key="item.image.id"
                            class="flex gap-5 items-center"
                        >
                            <img
                                :src="item.image.url"
                                alt=""
                                class="select-none w-20"
                                draggable="false"
                            />
                            <span
                                class="text-black text-xl font-normal font-[Arial] flex-[3]"
                                >{{ item.title }}</span
                            >
                        </li>
                    </ul>
                </div>
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
const dataTrust = computed(() => pageData.value.data?.trust)

const paymentMethods = computed(() => dataTrust.value?.payment_methods)
const paymentMethodsTitle = computed<string>(() => paymentMethods.value?.title)
const paymentMethodsList = computed<Array<{ image: ImageInterface }>>(
    () => paymentMethods.value?.images ?? [],
)

const title = computed<string>(() => dataTrust.value?.title)
const subTitle = computed<string>(() => dataTrust.value?.sub_title)

const trustList = computed<Array<{ image: ImageInterface }>>(
    () => dataTrust.value?.images ?? [],
)
const certificateList = computed<
    Array<{
        title: string
        image: ImageInterface
    }>
>(() => dataTrust.value?.certificates ?? [])

window.addEventListener('resize', () => {
    resize()
})

const countItemsToShow = computed(() => {
    if (isMobile.value) {
        return 2
    }

    if (isTablet.value) {
        return 3
    }

    if (isTabletBig.value) {
        return 5
    }

    return 9
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
</style>
