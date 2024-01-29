<template>
    <div class="containerRoot" :class="size">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        size?: 'default' | 'large' | 'small'
    }>(),
    {
        size: 'default',
    },
)
</script>

<style scoped lang="scss">
.containerRoot {
    width: 100%;
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;

    &.small {
        padding-inline: 15.5rem;

        @media (max-width: 1280px) {
            padding-inline: 10rem;
        }

        @media (max-width: 1024px) {
            padding-inline: 8rem;
        }

        @media (max-width: 768px) {
            padding-inline: 3rem;
        }

        @media (max-width: 640px) {
            padding-inline: 1rem;
        }
    }

    &.default {
        padding-inline: 8.5rem;

        @media (max-width: 1280px) {
            padding-inline: 7rem;
        }

        @media (max-width: 1024px) {
            padding-inline: 6rem;
        }

        @media (max-width: 768px) {
            padding-inline: 3rem;
        }

        @media (max-width: 640px) {
            padding-inline: 1rem;
        }
    }

    &.large {
        padding-inline: 4.5rem;

        @media (max-width: 1280px) {
            padding-inline: 4.5rem;
        }

        @media (max-width: 1024px) {
            padding-inline: 4rem;
        }

        @media (max-width: 768px) {
            padding-inline: 3rem;
        }

        @media (max-width: 640px) {
            padding-inline: 1rem;
        }
    }
}
</style>
