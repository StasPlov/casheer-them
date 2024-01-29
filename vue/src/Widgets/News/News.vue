<template>
    <div
        class="newsCardRoot"
        :class="{ isLarge: props.large, isWithinList: props.withinList }"
        v-if="item"
    >
        <div class="flex flex-col gap-[1em]">
            <img
                v-if="image !== undefined"
                :src="image.url"
                :alt="image.alt"
                class="newsImage"
                draggable="false"
            />

            <div
                class="flex flex-col z-10"
                :class="[props.large ? 'gap-[1.5rem]' : 'gap-[0.5rem]']"
            >
                <h1
                    class="newsTitle font-mont font-bold leading-tight"
                    :class="[props.large ? 'text-[2.25rem]' : 'text-[1.56rem]']"
                    v-html="post.post_title"
                ></h1>
                <span
                    class="newsExcerpt leading-tight"
                    v-html="post.post_excerpt"
                ></span>
            </div>
        </div>

        <template v-if="button && link">
            <a :href="link" v-if="button.is_active">
                <Button class="bg-transparent self-start !p-0 gap-6 z-10">
                    <span
                        class="text-white text-3xl font-semibold font-mont underline text-center tracking-wide"
                        >{{ button.text }}</span
                    >
                    <ArrowIcon class="rtl:rotate-180" />
                </Button>
            </a>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import NewsPageDataInterface from '@/Entity/NewsPageDataInterface'

import Button from '@/Ui/Button.vue'

import ArrowIcon from './Assets/ArrowIcon.vue'

const props = defineProps<{
    item: NewsPageDataInterface
    large?: boolean
    withinList?: boolean
}>()

const post = computed(() => props.item?.post)
const link = computed(() => props.item?.link)
const button = computed(() => props.item?.data?.button)
const image = computed(() => props.item?.data?.image)
</script>

<style scoped lang="scss">
.newsCardRoot {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;

    &.isLarge {
        %largeImage {
            @media (min-width: 1024px) {
                height: 30rem;
            }
        }

        %largeTitle {
            font-size: 2.5rem;
        }

        %largeExcerpt {
            @media (min-width: 768px) {
                font-size: 1.5625rem;
            }

            @media (min-width: 1024px) {
                padding-inline-end: 5rem;
            }
        }
    }

    &.isLarge,
    &.isWithinList {
        justify-content: space-between;
    }
}

.newsImage {
    @extend %largeImage;

    width: 30rem;

    @media (min-width: 1024px) {
        max-width: unset;
        width: 100%;
        height: 12.5rem;
        object-fit: cover;
        object-position: center;
    }
}

.newsTitle {
    @extend %largeTitle;

    font-size: 1.5625rem;
}

.newsExcerpt {
    @extend %largeExcerpt;

    font-size: 1.25rem;
}
</style>
