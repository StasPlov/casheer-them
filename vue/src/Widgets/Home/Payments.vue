<template>
    <div class="relative w-full bg-[var(--color-black1)]" v-if="pageData">
        <Container
            class="pt-[311px] pb-[50px] grid grid-cols-2 items-center max-xl:pt-[200px] max-md:pt-[100px] max-phoneX:pt-[60px] max-phoneX:items-start max-phoneX:flex max-phoneX:flex-col-reverse max-phoneX:gap-20"
        >
            <div class="flex justify-end max-phoneX:self-start">
                <div class="flex flex-col gap-16 z-30">
                    <h2
                        class="text-white text-6xl max-sm:text-4xl font-normal leading-tight max-phoneX:hidden"
                        v-html="title"
                    ></h2>

                    <div class="flex flex-col gap-8 z-10" v-if="list.length">
                        <template v-for="(item, index) in list" :key="item">
                            <Dropdown
                                class="z-10"
                                :style="`--dropdown-color: ${item.item?.color}`"
                                :classIsOpen="`!text-[var(--dropdown-color)] !font-bold gap-8`"
                                :item="item"
                                @selectItem="setSelectItem"
                            >
                                <template #text>
                                    <h3
                                        class="text-white text-2xl max-sm:text-xl font-semibold font-mont transition-all cursor-default select-none hover:scale-110 hover:translate-x-3 duration-500"
                                        v-html="item.item.title"
                                    ></h3>
                                </template>

                                <template #content>
                                    <div
                                        class="flex flex-col gap-4 max-w-[16.875rem] mt-6 max-md:mt-2"
                                    >
                                        <span
                                            class="text-white text-lg font-normal block select-none"
                                            v-html="item.item.description"
                                        ></span>

                                        <a
                                            :href="
                                                item.item.button.link?.url ?? ''
                                            "
                                            v-if="item.item.button.is_active"
                                            class="flex gap-2 self-end items-center"
                                        >
                                            <span
                                                class="text-white text-xl font-normal leading-none"
                                                >{{
                                                    item.item.button.text
                                                }}</span
                                            >

                                            <Button
                                                class="bg-transparent !p-0 arrowButton"
                                            >
                                                <ButtonIcon
                                                    :color="item.item?.color"
                                                    :id="index"
                                                ></ButtonIcon>
                                            </Button>
                                        </a>
                                    </div>
                                </template>
                            </Dropdown>
                        </template>
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <img
                    v-if="imageSelect"
                    :src="imageSelect.url"
                    alt=""
                    class="w-[26.875rem] object-contain h-min select-none z-20 phoneImage"
                    ref="phoneImage"
                    draggable="false"
                />
                <img
                    v-if="imageBgSelect"
                    :src="imageBgSelect.url"
                    alt=""
                    class="absolute select-none right-0 top-0 animate-pulse max-phoneX:top-1/4 z-10 mix-blend-lighten phoneBackgroundImage"
                    ref="phoneImageBackground"
                    draggable="false"
                />
            </div>

            <h2
                class="text-white text-4xl font-normal leading-tight hidden max-phoneX:block"
                v-html="title"
            ></h2>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'
import Dropdown from '@/Ui/Dropdown/Dropdown.vue'
import ItemInterface from '@/Ui/Dropdown/Type/ItemInterface'

import ButtonIcon from './Assets/ButtonIcon.vue'
import PaymentsInterface from './Entity/PaymentsInterface'

gsap.registerPlugin(ScrollTrigger)

let phoneImage = ref(null)
let phoneImageBackground = ref(null)

let list = ref<Array<ItemInterface>>([])
let listIsInit = ref(false)
let itemSelect = ref<ItemInterface | null>(null)

let imageSelect = ref<ImageInterface | null>(null)
let imageBgSelect = ref<ImageInterface | null>(null)

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const title = computed<string>(() => pageData.value.data?.payments_title)
const itemList = computed<Array<PaymentsInterface>>(
    () => pageData.value.data?.payments ?? [],
)

watch(
    pageData.value,
    () => {
        if (!itemList.value.length) {
            return
        }

        if (!listIsInit.value) {
            initList()
            listIsInit.value = true
        }
    },
    { flush: 'post' },
)

/* onMounted(() => {
    if(!listIsInit.value) {
        initList();
    }

    phoneImage = ref(null);
    phoneImageBackground = ref(null);
}); */

function initList(active: PaymentsInterface | undefined = undefined) {
    list.value = itemList.value.map((element, i) => {
        const isActive =
            active && active === element
                ? true
                : active === undefined
                ? i === 0
                : false // first item is active set
        return {
            isActive,
            item: element,
        }
    })

    setSelectItem(list.value.find(i => i.isActive) ?? null)
}

function setSelectItem(item: ItemInterface | null) {
    if (item === null) return

    animatePhone()
    animatePhoneBg()
    itemSelect.value = null

    list.value.forEach(i => {
        if (i === item) {
            itemSelect.value = i.item
            imageSelect.value = i.item?.image
            imageBgSelect.value = i.item?.background

            i.isActive = true
            return
        }

        i.isActive = false
    })
}

function animatePhone() {
    gsap.fromTo(
        phoneImage.value,
        {
            opacity: 0,
            autoAlpha: 0,
            y: '200px',
        },
        {
            opacity: 1,
            autoAlpha: 1,
            y: 0,
            duration: 3,
            ease: 'power4.out',
        },
    )
}

function animatePhoneBg() {
    gsap.fromTo(
        phoneImageBackground.value,
        {
            opacity: 0,
            autoAlpha: 0,
        },
        {
            opacity: 1,
            autoAlpha: 1,
            duration: 4,
            ease: 'power4.out',
        },
    )
}
</script>

<style scoped lang="scss">
[dir='rtl'] .phoneImage {
    transform: scale(0.8);
}
[dir='rtl'] .arrowButton,
[dir='rtl'] .phoneBackgroundImage {
    transform: scaleX(-1);
}

[dir='rtl'] .phoneBackgroundImage {
    right: auto;
    left: 0;
}
</style>
