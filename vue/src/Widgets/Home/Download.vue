<template>
    <div
        class="w-full bg-gradient-casheer-dowload-to-b max-md:overflow-hidden flex justify-center"
    >
        <Container
            class="pt-[86px] pb-[33px] max-xl:pt-[40px] max-md:pt-[86px] max-md:pb-[9rem] container"
        >
            <div class="mainInfo">
                <h2
                    class="text-white font-mont text-6xl max-xl:text-4xl font-bold max-phoneX:text-center heading"
                    v-html="title"
                ></h2>

                <ul class="qrCodes">
                    <li
                        v-for="item in downloadList"
                        :key="item.image_qr.id"
                        class="flex flex-col gap-8"
                    >
                        <img
                            :src="item.image_qr.url"
                            alt=""
                            class="select-none qrCode"
                            draggable="false"
                        />

                        <a
                            :href="item.button.link ? item.button.link.url : ''"
                            v-if="item.button.is_active"
                        >
                            <Button
                                class="border-2 border-white border-solid bg-transparent !rounded-[6.25rem]"
                            >
                                <img :src="item.button.image.url" alt="" />
                            </Button>
                        </a>
                    </li>
                </ul>
            </div>

            <img
                v-if="background"
                :src="background.url"
                alt=""
                class="max-w-[65.875rem] w-[70%] absolute right-0 rtl:right-auto rtl:left-0 bottom-0 z-0 max-md:min-w-[150%] max-sm:min-w-[200%] max-md:right-[-7rem] max-md:rtl:left-[-7rem] max-sm:right-[-14rem] max-sm:rtl:left-[-14rem] max-phoneX:right-[-10rem] max-phoneX:rtl:left-[-10rem] backgroundImage"
            />
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
const data = computed(() => pageData.value.data?.download)

const title = computed<string>(() => data.value?.title)
const background = computed<ImageInterface>(() => data.value?.background)
const downloadList = computed<
    Array<{
        button: {
            image: ImageInterface
            link:
                | ''
                | {
                      url: string
                  }
            is_active: boolean
        }
        image_qr: ImageInterface
    }>
>(() => data.value?.app ?? [])
</script>

<style scoped>
[dir='rtl'] .backgroundImage {
    transform: scaleX(-1);
}

.container {
    max-width: 1440px;
    position: relative;
}

.mainInfo {
    max-width: 600px;
    position: relative;
    z-index: 1;
}

.heading {
    margin-bottom: 24px;
}

.qrCodes {
    max-width: 394px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 42px;

    @media (max-width: 1280px) {
        max-width: 300px;
        grid-gap: 20px;
    }

    @media (max-width: 1024px) {
        max-width: 250px;
    }

    @media (max-width: 768px) {
        max-width: 145px;
        grid-template-columns: auto;
        grid-gap: 50px;
    }

    @media (max-width: 425px) {
        grid-template-columns: auto;
        grid-gap: 50px;
    }
}

.qrCode {
    margin: 0 12px;
}
</style>
