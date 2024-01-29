<template>
    <div
        class="flex flex-col w-full bg-[var(--color-black1)] relative justify-center items-start"
    >
        <img
            v-if="background"
            :src="background?.url"
            alt=""
            class="absolute w-full max-sm:hidden animate-pulse select-none backgroundImage"
            draggable="false"
        />
        <img
            v-if="backgroundMob"
            :src="backgroundMob?.url"
            alt=""
            class="absolute w-full hidden max-sm:block select-none backgroundImage"
            draggable="false"
        />

        <Container
            class="flex flex-col gap-16 pt-[123px] max-sm:justify-between max-sm:h-full max-sm:pt-[104px] mainInfo"
        >
            <div class="flex flex-col gap-8 max-sm:gap-14 max-sm:min-h-[400px]">
                <img
                    v-if="logo"
                    :src="logo.url"
                    alt=""
                    class="w-[370px] max-sm:w-[277px] max-phoneM:w-[220px] select-none"
                    draggable="false"
                />

                <div class="max-w-[43.125rem] text-5xl max-sm:text-4xl">
                    <span
                        class="text-white font-bold leading-tight font-mont"
                        v-html="title"
                    ></span>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <div
                    class="flex gap-10 mb-5 max-phoneM:flex-col max-phoneM:gap-4"
                >
                    <a
                        :href="button.link?.url ?? ''"
                        v-if="button && button.is_active"
                    >
                        <Button
                            class="!bg-transparent btn relative !py-4 hover:scale-105 duration-500"
                        >
                            <span
                                class="text-white text-base font-[Arial] font-semibold"
                                >{{ button.text }}</span
                            >
                        </Button>
                    </a>

                    <a
                        :href="buttonTwo.link"
                        v-if="buttonTwo && buttonTwo.is_active"
                    >
                        <Button
                            class="bg-transparent underline underline-offset-4 hover:text-opacity-80"
                        >
                            <span
                                class="text-white text-base font-[Arial] font-bold"
                                >{{ buttonTwo.text }}</span
                            >
                        </Button>
                    </a>
                </div>

                <hr class="max-w-[70%] max-sm:max-w-full" />

                <div class="flex flex-col gap-1">
                    <span
                        class="text-white text-sm font-normal"
                        v-for="item in infoList"
                        :key="item"
                        >{{ item.text }}</span
                    >
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

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const dataHeader = computed(() => pageData.value.data?.header)
const button = computed(() => dataHeader.value?.button)
const buttonTwo = computed(() => dataHeader.value?.button_two)
const background = computed(() => dataHeader.value?.background)
const backgroundMob = computed(() => dataHeader.value?.background_mobile)
const logo = computed(() => dataHeader.value?.logo)
const title = computed(() => dataHeader.value?.title)
const infoList = computed(() => dataHeader.value?.info)
</script>

<style scoped>
.btn {
    min-width: 170px;
}
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

.mainInfo {
    z-index: 2;
}

.backgroundImage {
    z-index: 1;
}

[dir='rtl'] .backgroundImage {
    transform: scaleX(-1);
}
</style>
