<template>
    <div class="w-full bg-[var(--color-black1)] flex items-center relative">
        <img
            v-if="background"
            :src="background.url"
            alt=""
            class="top-[11rem] absolute w-full left-0 animate-pulse select-none max-md:top-auto max-md:bottom-[-16.5rem] max-md:left-[-11.875rem] max-md:min-w-[200%] max-md:object-contain z-10"
            draggable="false"
        />

        <Container
            class="grid grid-cols-2 gap-10 py-[15vw] pt-[5vw] w-full max-md:grid-cols-1 max-md:pb-[30vw]"
        >
            <div
                class="flex flex-col justify-center gap-12 z-20 max-md:order-1"
            >
                <div class="flex flex-col gap-9">
                    <h1
                        class="font-mont text-white text-7xl max-lg:text-5xl max-sm:text-4xl font-bold"
                        v-html="title"
                    ></h1>

                    <span
                        class="text-4xl max-sm:text-3xl text-white font-normal leading-tight"
                        v-html="description"
                    ></span>
                </div>

                <div class="flex gap-8 max-phoneM:gap-4 items-center mb-9">
                    <img
                        v-if="logo"
                        :src="logo.url"
                        alt=""
                        class="select-none w-70"
                        draggable="false"
                    />

                    <a
                        :href="button.link?.url ?? ''"
                        v-if="button && button?.is_active"
                    >
                        <Button
                            class="border-[var(--color-arctic1)] border-solid border-[5px] bg-transparent !rounded-[6.25rem] !px-12 !py-1"
                        >
                            <span
                                class="text-white text-base font-bold font-[Arial]"
                                >{{ button.text }}</span
                            >
                        </Button>
                    </a>
                </div>
            </div>

            <div
                class="flex justify-end rtl:justify-start max-md:justify-center rtl:max-md:justify-center z-10"
            >
                <img
                    v-if="imageMobile"
                    :src="imageMobile.url"
                    alt=""
                    class="w-full select-none md:hidden"
                    draggable="false"
                />

                <div class="relative top-[-3.125rem] max-md:hidden">
                    <img
                        v-if="image"
                        :src="image.url"
                        alt=""
                        class="w-[16.5rem] relative rtl:top-[5rem] select-none"
                        draggable="false"
                        ref="waletImage"
                    />
                    <img
                        v-if="imageTwo"
                        :src="imageTwo.url"
                        alt=""
                        class="absolute left-[-14.5rem] top-[23.75rem] rtl:left-[-14.5rem] rtl:top-[10rem] max-w-none w-[25.625rem] select-none"
                        draggable="false"
                        ref="waletImage2"
                    />
                </div>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ButtonInterface from '@/Entity/ButtonInterface'
import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

gsap.registerPlugin(ScrollTrigger)
const waletImage = ref(null)
const waletImage2 = ref(null)

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const header = computed(() => pageData.value.data?.header)

const background = computed<ImageInterface>(() => header.value?.background)
const button = computed<ButtonInterface>(() => header.value?.button)
const description = computed<string>(() => header.value?.description)
const title = computed<string>(() => header.value?.title)
const logo = computed<ImageInterface>(() => header.value?.logo)
const image = computed<ImageInterface>(() => header.value?.image)
const imageTwo = computed<ImageInterface>(() => header.value?.image_two)
const imageMobile = computed<ImageInterface>(() => header.value?.image_mobile)
console.log(header)
watchEffect(
    () => {
        animateWalet()
        animateWalet2()
    },
    { flush: 'post' },
)

function animateWalet() {
    gsap.fromTo(
        waletImage.value,
        {
            opacity: 0,
            autoAlpha: 0,
            x: '200px',
        },
        {
            opacity: 1,
            autoAlpha: 1,
            duration: 5,
            x: '0px',
            ease: 'power4.out',
        },
    )
}

function animateWalet2() {
    gsap.fromTo(
        waletImage2.value,
        {
            opacity: 0,
            autoAlpha: 0,
            y: '100px',
        },
        {
            opacity: 1,
            autoAlpha: 1,
            delay: 1.5,
            duration: 4,
            y: '0px',
            ease: 'power4.out',
        },
    )
}
</script>
