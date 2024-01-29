<template>
    <div class="flex flex-col bg-[var(--color-black1)] relative" v-if="data">
        <Light4 class="absolute right-0 top-0"></Light4>

        <Container
            class="py-[14vw] flex flex-col gap-16 items-center justify-center"
        >
            <div class="flex flex-col gap-4 items-center z-10">
                <h3
                    class="gradient text-4xl text-[2.5rem] font-mont font-normal"
                    v-html="title"
                ></h3>
                <span
                    class="text-white text-2xl font-normal text-center"
                    v-html="description"
                ></span>
            </div>

            <template v-if="button">
                <a :href="button.link.url" v-if="button.link" class="z-10">
                    <Button
                        class="!bg-transparent btn relative !py-4 !px-12 hover:scale-105 duration-500"
                    >
                        <span class="text-white text-base font-normal">{{
                            button.text
                        }}</span>
                    </Button>
                    |
                </a>

                <Button
                    class="!bg-transparent btn relative !py-4 !px-12 hover:scale-105 duration-500 z-10"
                    v-else
                >
                    <span class="text-white text-base font-normal">{{
                        button.text
                    }}</span>
                </Button>
            </template>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import ButtonInterface from '@/Entity/ButtonInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

import Light4 from './Assets/Light4.vue'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const data = computed(() => pageData.value.data?.question)

const button = computed<ButtonInterface>(() => data.value?.button)
const title = computed<string>(() => data.value?.title)
const description = computed<string>(() => data.value?.description)
</script>

<style scoped>
.gradient {
    background: linear-gradient(
        99deg,
        #7d00e2 0%,
        #1cf4ff 53.33%,
        #18fe6a 96.05%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 3.125rem;
    border: 0.3125rem solid transparent;
    background: radial-gradient(var(--color-green1), transparent) border-box;
    mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}
</style>
