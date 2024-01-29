<template>
    <div
        class="w-full bg-white relative overflow-hidden min-h-[1166px] max-xl:min-h-[800px] max-md:min-h-[1000px] flex items-center justify-center"
        v-if="always"
    >
        <img
            v-if="always?.background"
            :src="always.background.url"
            alt=""
            class="absolute w-full h-full z-0 max-md:w-[300%] max-md:max-w-none"
            draggable="false"
        />

        <Container class="py-[80px] max-sm:py-[40px]">
            <div
                class="flex flex-col items-center translate-y-[77px] max-md:translate-y-[65px] max-sm:translate-y-[77px]"
            >
                <div class="flex flex-col z-10">
                    <span
                        class="font-mont text-center text-5xl font-bold text-black max-md:text-white max-sm:text-4xl max-sm:translate-y-[-80px]"
                        v-html="always?.title"
                    ></span>
                    <span
                        class="font-mont text-center font-bold text-[9rem] text-black max-sm:text-[5rem] max-phoneM:text-[4rem]"
                        v-html="always?.title_two"
                    ></span>
                </div>

                <span
                    class="text-black text-2xl font-normal text-center max-w-[40rem] z-10 max-md:font-bold max-sm:translate-y-[125px]"
                    v-html="always?.description"
                ></span>
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

import Container from '@/Ui/Container.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const always = computed<{
    background?: ImageInterface
    title?: string
    title_two?: string
    description?: string
}>(() => pageData.value.data?.always)
</script>
