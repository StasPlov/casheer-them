<template>
    <div class="flex flex-col bg-[var(--color-black1)] relative">
        <Light1
            class="absolute left-0 top-0 z-10 select-none"
            draggable="false"
        ></Light1>

        <div class="relative w-full flex text-center max-sm:flex-col z-10">
            <div class="w-full max-sm:pb-[70%] relative">
                <img
                    v-if="background"
                    :src="background.url"
                    alt=""
                    class="w-full max-sm:h-full max-sm:absolute object-cover select-none -z-0 mainImage"
                    draggable="false"
                />
            </div>

            <div class="w-full absolute max-sm:relative bottom-0 z-20">
                <Container size="large">
                    <h1
                        class="text-white text-9xl font-bold font-mont select-none py-4 max-sm:pt-[34px] max-sm:text-4xl max-sm:text-start max-md:text-7xl"
                        v-html="title"
                    ></h1>
                </Container>
            </div>
        </div>

        <Container size="small" class="pt-[110px] max-md:pt-[50px] z-20">
            <span
                class="text-white text-3xl max-md:text-2xl font-normal"
                v-html="description"
            ></span>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Container from '@/Ui/Container.vue'

import Light1 from './Assets/Light1.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.header)

const background = computed<ImageInterface>(() => data.value?.background)
const description = computed<string>(() => data.value?.description)
const title = computed<string>(() => data.value?.title)
</script>

<style scoped>
.mainImage {
    max-height: calc(100vh - 91px);
}
</style>
