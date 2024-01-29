<template>
    <div
        class="w-full bg-[var(--color-black1)] rounded-[2.875rem] max-phoneX:overflow-hidden"
        v-if="dataWelcome"
    >
        <Container class="pt-[120px] max-sm:pt-[79px] flex flex-col">
            <div class="hidden max-phoneX:flex justify-center shadow">
                <img
                    v-if="image"
                    :src="image.url"
                    alt=""
                    draggable="false"
                    class="w-[17.125rem] select-none relative z-1"
                />
            </div>

            <div
                class="flex flex-col gap-4 items-start relative z-10 pb-12 max-phoneX:pt-12"
            >
                <h2
                    class="font-mont text-5xl max-sm:text-4xl max-phoneM:text-3xl text-white font-semibold leading-tight select-none"
                    v-html="title"
                ></h2>

                <a :href="button.link?.url ?? ''" v-if="button.is_active">
                    <Button
                        class="!bg-transparent btn relative !py-4 hover:scale-105 duration-500"
                    >
                        <span
                            class="text-white text-base font-[Arial] font-semibold"
                            >{{ button.text }}</span
                        >
                    </Button>
                </a>
            </div>

            <div class="flex justify-center">
                <div
                    class="relative max-phoneX:flex max-phoneX:justify-end top-[-1.625rem] z-1"
                >
                    <img
                        v-if="imageTwo"
                        :src="imageTwo.url"
                        alt=""
                        draggable="false"
                        class="w-[61.8125rem] select-none max-phoneX:min-w-[250%] max-phoneX:mr-[-6.6875rem] shadow"
                    />
                    <img
                        v-if="image"
                        :src="image.url"
                        alt=""
                        draggable="false"
                        class="w-[16.125rem] select-none absolute bottom-0 left-16 max-phoneX:hidden shadow"
                    />
                </div>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const dataWelcome = computed(() => pageData.value.data?.welcome)

const title = computed(() => dataWelcome.value?.title)
const button = computed(() => dataWelcome.value?.button)
const image = computed<ImageInterface>(() => dataWelcome.value?.image)
const imageTwo = computed<ImageInterface>(() => dataWelcome.value?.image_two)
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
    background: radial-gradient(var(--color-green1), transparent) border-box;
    mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}

.shadow {
    filter: drop-shadow(-11px -52px 18px #344287);
}
</style>
