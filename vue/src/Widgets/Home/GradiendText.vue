<template>
    <div
        class="flex flex-col w-full max-md:min-h-0 bg-[var(--color-black1)] relative justify-center items-start"
    >
        <Container
            class="pt-[330px] pb-[200px] max-xl:pt-[110px] max-xl:pb-[20px]"
        >
            <span
                class="text-5xl font-bold font-mont leading-none text-transparent bg-clip-text bg-gradient-casheer-to-b anim-bg-grident max-sm:text-4xl max-sm:text-bold max-sm:text-bold max-sm:leading-tight"
                v-html="pageDataText"
            ></span>
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
const pageDataText = computed<string>(() => pageData.value.data?.gradient_text)
</script>

<style>
.anim-bg-grident,
.anim-bg-grident p {
    -webkit-background-clip: text;
    background-clip: text;
    background: linear-gradient(
        165deg,
        #7d00e200 10.24%,
        #7d00e2 21.24%,
        #5066f6 33.54%,
        #1cf4ff 55.78%,
        #18fe6a 68.07%,
        #fff 81.29%,
        #7d00e200 99.24%
    );
    background-size: 200% auto;
    animation: shine 8s linear infinite;
}

@keyframes shine {
    to {
        background-position: -200% center;
    }
}
</style>
