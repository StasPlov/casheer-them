<template>
    <div class="block-g rounded-[1.6875rem] cursor-default">
        <div class="px-7 py-6 flex gap-8">
            <div class="flex flex-col gap-9">
                <h3
                    class="text-white text-2xl font-mont font-bold select-none"
                    v-html="title"
                ></h3>
                <span
                    class="text-white text-xl font-[Arial] font-normal select-none"
                    v-html="description"
                ></span>
            </div>

            <div class="flex items-center" v-if="image">
                <img
                    :src="image.url"
                    alt=""
                    class="max-w-[6.25rem] h-max select-none"
                    draggable="false"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageInterface from '@/Entity/ImageInterface'

defineProps<{
    title: string
    description: string
    image: ImageInterface
}>()
</script>

<style scoped>
.block-g {
    background: linear-gradient(
        145deg,
        #5066f6 -1.21%,
        rgba(47, 128, 237, 0) 100%
    );
}
</style>
