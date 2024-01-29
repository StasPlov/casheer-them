<template>
    <div
        class="w-full bg-white relative launch overflow-hidden"
        :style="`--data-bg-color: ${color}`"
    >
        <Container
            class="flex flex-col gap-28 py-[100px] max-sm:py-[140px] z-0 max-md:pb-[20.25rem]"
        >
            <div class="flex flex-col gap-24 max-sm:gap-12 items-center z-10">
                <h1
                    class="text-[var(--data-bg-color)] text-3xl text-[2.1875rem] font-mont uppercase font-bold text-center max-phoneX:max-w-[50%]"
                    v-html="title"
                ></h1>

                <ul
                    class="flex flex-wrap gap-0 gap-y-8 max-md:flex-col max-md:items-center max-md:gap-24 max-sm:gap-8"
                >
                    <template v-for="(item, index) in stepList" :key="index">
                        <li
                            class="flex flex-col gap-11 max-sm:gap-4 text-center"
                            ref="itemsListAnim"
                        >
                            <span
                                class="text-black text-6xl font-[Arial] font-bold"
                                >{{ item.num }}</span
                            >
                            <span
                                class="text-black text-3xl font-bold font-[Arial] uppercase"
                                v-html="item.title"
                            ></span>
                            <span
                                class="text-black text-xl font-normal font-[Arial] max-w-[14.625rem]"
                                v-html="item.sub_title"
                            ></span>
                        </li>
                        <li
                            v-if="stepList && index !== stepList.length - 1"
                            ref="itemsListAnim"
                            class="max-sm:mb-4"
                        >
                            <img
                                v-if="props.stepImage"
                                :src="stepImage?.url"
                                alt=""
                                class="max-w-[3.75rem] mt-10 max-md:[transform:rotateZ(90deg)] max-md:max-h-3 select-none rtl:[transform:rotateY(180deg)]"
                                draggable="false"
                            />
                        </li>
                    </template>
                </ul>
            </div>

            <div class="flex flex-col gap-5 items-start z-10" v-if="action">
                <h1
                    class="text-[var(--data-bg-color)] text-4xl text-[2.5rem] font-mont font-medium max-md:max-w-[50%]"
                    v-html="action.title"
                ></h1>

                <a
                    :href="action.button.link?.url ?? ''"
                    v-if="action.button.is_active"
                >
                    <Button
                        class="border-[var(--data-bg-color)] border-solid border-[5px] bg-transparent !rounded-[6.25rem] !px-[3rem] !py-[0.5rem]"
                    >
                        <span
                            class="text-[var(--color-black1)] text-2xl text-[1.6875rem] font-bold font-[Arial]"
                            >{{ action.button.text }}</span
                        >
                    </Button>
                </a>
            </div>
        </Container>

        <img
            v-if="image"
            :src="image.url"
            alt=""
            class="absolute right-0 bottom-0 select-none max-w-[40vw] rtl:left-0 rtl:right-auto rtl:[transform:rotateY(180deg)] max-phoneX:max-w-full max-phoneX:right-[-40px] rtl:max-phoneX:left-[-40px]"
            draggable="false"
            ref="imageAnim"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ImageInterface from '@/Entity/ImageInterface'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

import ActionInterface from './Type/ActionInterface'
import StepInterface from './Type/StepInterface'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
    title?: string
    image?: ImageInterface
    stepImage?: ImageInterface
    color?: string
    stepList?: Array<StepInterface>
    action?: ActionInterface
}>()

let imageAnim = ref(null)
let itemsListAnim = ref([])

watchEffect(() => {
    animateImage()
    animateItemList()
})

function animateImage() {
    gsap.fromTo(
        imageAnim.value,
        {
            opacity: 0,
            x: '50%',
            y: '50%',
        },
        {
            opacity: 1,
            autoAlpha: 1,
            duration: 4,
            x: '0',
            y: '0',
            ease: 'power4.out',
            scrollTrigger: {
                trigger: imageAnim.value,
                start: 'top 100%',
                end: 'bottom bottom',
                toggleActions: 'play none none reset',
            },
        },
    )
}

function animateItemList() {
    gsap.utils.toArray<any>(itemsListAnim.value).forEach((element, i) => {
        gsap.fromTo(
            element,
            {
                opacity: 0,
                x: '-50%',
            },
            {
                opacity: 1,
                autoAlpha: 1,
                delay: i * 0.8,
                duration: 2,
                x: '0',
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

<style scoped>
.launch:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 170px;
    background-image: linear-gradient(
        0deg,
        var(--data-bg-color) -15%,
        #fff0 100%
    );
}

.launch:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 170px;
    background-image: linear-gradient(
        180deg,
        var(--data-bg-color) -15%,
        #fff0 100%
    );
}
</style>
