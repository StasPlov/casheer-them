<template>
    <div class="flex flex-col bg-[var(--color-black1)] relative">
        <!-- <img :src="backgroundGradient" alt="" class="absolute right-0 top-[-70%] select-none" draggable="false"> -->
        <Light2
            class="absolute right-0 top-[-31.25rem] select-none"
            draggable="false"
        ></Light2>

        <Container class="py-[250px] max-xl:py-[150px] max-md:py-[120px]">
            <div class="flex flex-col gap-10">
                <h2
                    class="text-white text-5xl max-xl:text-4xl font-bold font-mont lg:text-center leading-tight z-10"
                    v-html="title"
                ></h2>

                <span
                    class="text-white sm:text-2xl lg:text-4xl font-normal lg:text-center z-10"
                    v-html="description"
                ></span>
            </div>
        </Container>

        <img
            v-if="image"
            :src="image.url"
            alt=""
            class="select-none z-10"
            draggable="false"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Container from '@/Ui/Container.vue'

import Light2 from './Assets/Light2.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.take)

const image = computed<ImageInterface>(() => data.value?.image)
const description = computed<string>(() => data.value?.description)
const title = computed<string>(() => data.value?.title)
</script>
