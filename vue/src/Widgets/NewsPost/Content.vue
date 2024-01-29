<template>
    <div class="contentRoot">
        <div class="contentBody z-10 flex flex-col gap-12">
            <div class="flex flex-col gap-12">
                <div class="flex flex-col gap-4">
                    <h2
                        class="text-5xl font-mont font-bold"
                        v-html="post.post.post_title"
                    ></h2>
                    <div :class="$style.content">
                        <WPContent :content="post.post.post_content" />
                    </div>
                </div>

                <Author></Author>
            </div>

            <a href="/news" v-if="button?.is_active" class="self-center">
                <Button class="bg-transparent">
                    <span
                        class="text-white text-3xl font-bold font-mont underline text-center"
                        >{{ button.text }}</span
                    >
                </Button>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonInterface from '@/Entity/ButtonInterface'
import NewsPageDataInterface from '@/Entity/NewsPageDataInterface'

import WPContent from '@/Components/WPContent.vue'

import Button from '@/Ui/Button.vue'

import Author from './Author.vue'

defineProps<{
    post: NewsPageDataInterface
    button?: ButtonInterface
}>()
</script>

<style lang="scss" scoped>
.contentRoot {
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: var(--color-black1);
}

.contentBody {
    max-width: 42rem;
    padding: 3rem 1rem;
}
</style>
<style lang="scss" module>
.content {
    font-size: 1.5625rem;
    line-height: 1.2;

    :global {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-block-end: 1em;
            font-weight: 700;
        }

        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.875rem;
        }

        h3 {
            font-size: 1.5rem;
        }

        h4 {
            font-size: 1.35rem;
        }

        h5 {
            font-size: 1.1rem;
        }

        h6 {
            font-size: 1rem;
        }

        blockquote {
            font-family: Mont, sans-serif;
            font-size: 2.5rem;
            font-weight: 300;
            margin-inline-start: 5rem;
            margin-block: 4rem;
            padding-inline: 2rem 4rem;
            border-inline-start: 3px solid;

            @media (max-width: 42rem) {
                margin-inline-start: unset;
                padding-inline: 1rem 0;
            }

            @media (max-width: 400px) {
                font-size: 2rem;
            }
        }

        .alignleft,
        .alignright {
            margin-block-start: unset;

            @media (max-width: 42rem) {
                float: unset;
            }
        }
    }
}
</style>
