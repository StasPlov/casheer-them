<template>
    <div class="bg-[var(--color-black1)] relative overflow-hidden">
        <div class="flex max-md:flex-col-reverse">
            <img
                v-if="image"
                :src="image.url"
                alt=""
                class="w-full select-none relative z-10 brightness-90"
                draggable="false"
            />

            <div
                class="absolute z-10 py-[68px] top-0 left-0 right-0 max-md:relative max-md:py-[2vw]"
            >
                <Container class="flex flex-col gap-4">
                    <span
                        class="text-white text-5xl max-md:text-2xl font-mont font-bold leading-tight text-right max-md:text-start"
                        v-html="title"
                    ></span>
                </Container>
            </div>
        </div>
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
const data = computed(() => pageData.value.data?.technology_block)

const image = computed<ImageInterface>(() => data.value?.image)
const title = computed<string>(() => data.value?.title)
</script>
