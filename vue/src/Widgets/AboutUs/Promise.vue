<template>
    <div class="flex flex-col bg-white relative">
        <Light3
            class="absolute left-0 top-0 select-none z-0"
            draggable="false"
        ></Light3>
        <Light4
            class="absolute right-0 top-[30vh] select-none z-0"
            draggable="false"
        ></Light4>
        <Light5
            class="absolute right-0 top-[100vh] select-none z-0"
            draggable="false"
        ></Light5>

        <Light4
            class="hidden absolute right-0 bottom-0 select-none z-0 max-phoneX:block"
            draggable="false"
        ></Light4>
        <Light5
            class="hidden absolute right-0 bottom-[-40vh] select-none z-0 max-phoneX:block"
            draggable="false"
        ></Light5>

        <Container
            class="pt-[285px] max-xl:pt-[200px] max-md:pt-[100px] pb-0 z-10"
        >
            <div
                class="flex gap-60 pb-[200px] max-xl:pb-[150px] max-md:pb-[100px] justify-around max-md:flex-col max-md:gap-48"
            >
                <div class="hidden max-md:block">
                    <h2
                        class="text-black text-4xl font-bold font-mont text-center leading-tight"
                        v-html="title"
                    ></h2>
                </div>

                <div
                    class="flex rtl:flex-row-reverse max-md:flex-col max-md:rtl:flex-col gap-48 w-full max-md:gap-24 max-md:w-auto"
                >
                    <div
                        class="box-graident rounded-[1.4375rem] relative h-[32rem] max-w-[29rem] max-lg:max-w-[16rem] max-lg:max-h-[16rem] max-md:rtl:self-end w-full"
                    >
                        <img
                            v-if="image"
                            :src="image.url"
                            alt=""
                            class="absolute bottom-0 -right-16 select-none z-10 rounded-br-[1.4375rem]"
                            draggable="false"
                        />
                    </div>

                    <div class="flex flex-col gap-10">
                        <h2
                            class="text-black text-5xl max-xl:text-4xl font-bold font-mont max-md:hidden"
                            v-html="title"
                        ></h2>
                        <span
                            class="text-black text-xl font-normal max-w-[35.625rem] max-sm:text-[16px] max-sm:leading-tight"
                            v-html="description"
                        ></span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-16">
                <h2
                    class="text-black text-4xl font-bold font-mont text-center"
                    v-html="teamTitle"
                ></h2>

                <div class="self-center">
                    <ul
                        class="grid grid-cols-3 grid-flow-row gap-10 gap-x-32 max-sm:grid-cols-2 max-sm:gap-x-10 max-phoneX:grid-cols-1"
                    >
                        <li
                            v-for="item in teamList"
                            :key="item.title"
                            class="flex flex-col gap-5 items-center"
                        >
                            <img
                                v-if="item.image"
                                :src="item.image.url"
                                alt=""
                                class="select-none min-w-[12.5rem] min-h-[12.5rem] rounded-full"
                                draggable="false"
                            />

                            <div class="flex flex-col gap-2">
                                <span
                                    class="text-black text-xl font-semibold text-center max-phoneX:leading-relaxed"
                                    >{{ item.title }}</span
                                >
                                <span
                                    class="text-black text-sm font-normal text-center max-phoneX:leading-tight"
                                    >{{ item.sub_title }}</span
                                >
                            </div>
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

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Container from '@/Ui/Container.vue'

import Light3 from './Assets/Light3.vue'
import Light4 from './Assets/Light4.vue'
import Light5 from './Assets/Light5.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.promise)
const dataTeam = computed(() => pageData.value.data?.team)

const image = computed<ImageInterface>(() => data.value?.image)
const description = computed<string>(() => data.value?.description)
const title = computed<string>(() => data.value?.title)

const teamTitle = computed<string>(() => dataTeam.value?.title)
const teamList = computed<
    Array<{
        image: ImageInterface
        title: string
        sub_title: string
    }>
>(() => dataTeam.value?.list ?? [])
</script>

<style scoped>
.box-graident {
    transform: scale(1.2);
    background: radial-gradient(
        61% 76.25% at 50.8% 41.31%,
        rgba(125, 0, 226, 0.45) 0%,
        rgba(125, 0, 226, 0.15) 100%
    );
}
</style>
