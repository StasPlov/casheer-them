<template>
    <div
        class="w-full bg-[var(--color-black1)] relative justify-center items-start"
    >
        <Container class="BlockInfoRoot" :class="{ isReverse: isReverse }">
            <div
                class="flex-[2] flex items-center max-md:block"
                :class="{ 'justify-center text-center': !image }"
            >
                <div class="flex flex-col gap-8">
                    <h2
                        class="text-8xl font-bold text-transparent bg-clip-text bg-gradient-casheer-title-to-b font-mont max-sm:text-7xl max-xl:text-6xl max-phoneM:text-5xl max-md:mb-[10px]"
                        v-html="title"
                    ></h2>

                    <span
                        class="text-xl font-normal text-white max-w-[27.3125rem] max-md:hidden"
                        v-html="description"
                    ></span>
                </div>
            </div>

            <div
                class="flex-[3] max-lg:max-w-[350px] max-md:max-w-[none] max-md:mx-[-3rem] max-sm:mx-[-1rem]"
                v-if="image"
            >
                <img
                    :src="image.url"
                    alt=""
                    class="w-full h-full select-none object-contain"
                    draggable="false"
                />
            </div>

            <!-- mobile -->
            <div class="hidden flex-col gap-8 max-md:flex">
                <span
                    class="text-xl font-normal text-white max-w-[27.3125rem]"
                    v-html="description"
                ></span>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import ImageInterface from '@/Entity/ImageInterface'

import Container from '@/Ui/Container.vue'

interface PropsInterface {
    image: ImageInterface
    title: string
    description: string
    isReverse: boolean
}

withDefaults(defineProps<PropsInterface>(), {
    title: '',
    description: '',
    isReverse: false,
})
</script>

<style scoped lang="scss">
:root .BlockInfoRoot {
    padding-top: 130px;
    display: flex;
    gap: 2.75rem;

    @media (max-width: 1280px) {
        padding-top: 90px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }

    &:not(.isReverse) {
        @media (min-width: 768px) and (max-width: 1536px) {
            padding-inline-end: 0;
        }
    }

    &.isReverse {
        flex-direction: row-reverse;

        @media (min-width: 769px) and (max-width: 1536px) {
            padding-inline-start: 0;
        }

        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
}
</style>
