<template>
    <div class="bg-white">
        <Container class="pt-[100px] pb-[179px] max-md:pb-[88px]">
            <div class="flex flex-col gap-16">
                <h2
                    class="text-black text-4xl font-bold font-mont text-center z-10"
                    v-html="title"
                ></h2>

                <div class="self-center z-10">
                    <ul
                        class="grid grid-cols-3 grid-flow-row gap-14 gap-x-32 max-sm:gap-x-10 max-sm:grid-cols-2 max-phoneX:grid-cols-1"
                    >
                        <li
                            v-for="item in teamList"
                            :key="item.title"
                            class="flex flex-col gap-1 min-w-min max-phoneX:items-center"
                        >
                            <span
                                class="text-black text-2xl font-semibold text-start flex-nowrap max-sm:text-xl max-sm:leading-tight"
                                >{{ item.title }}</span
                            >
                            <a
                                :href="`mailto:${item.mail}`"
                                class="text-black text-lg font-normal underline text-start max-sm:text-base max-sm:text-[16px]"
                                >{{ item.mail }}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Container from '@/Ui/Container.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.talk)

const title = computed<string>(() => data.value?.title)
const teamList = computed<
    Array<{
        title: string
        mail: string
    }>
>(() => data.value?.info ?? [])
</script>
