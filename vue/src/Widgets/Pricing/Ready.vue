<template>
    <div class="bg-[var(--color-black1)] relative">
        <Light4 class="background absolute right-0 z-0"></Light4>

        <Container class="py-[10vw] pt-[4vw] flex flex-col items-center gap-20">
            <h2
                class="text-transparent text-4xl font-mont font-semibold bg-clip-text bg-gradient-casheer-pricing-to-r leading-tight"
                v-html="title"
            ></h2>

            <div class="flex gap-20">
                <template v-for="(item, index) in list" :key="item">
                    <a :href="item.link.url" v-if="item && item.is_active">
                        <Button
                            class="!bg-transparent btn1 relative !py-4 !px-20 hover:scale-105 duration-500"
                            :class="{ btn2: index == 1 }"
                        >
                            <span
                                class="text-white text-base font-[Arial] font-normal"
                                >{{ item.text }}</span
                            >
                        </Button>
                    </a>
                </template>
            </div>
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
const ready = computed(() => pageData.value?.data?.ready)

const title = computed<string>(() => ready.value?.title)
const list = computed<Array<ButtonInterface>>(() => ready.value?.button_list)
</script>

<style scoped>
.btn1::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 5px solid transparent;
    background: radial-gradient(var(--color-arctic1), transparent) border-box;
    mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}

.btn2::before {
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
.background {
    filter: blur(154px);
    width: 800px;
    height: 1105px;
}
</style>
