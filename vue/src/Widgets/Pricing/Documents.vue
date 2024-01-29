<template>
    <div class="bg-[var(--color-black1)]">
        <Container class="pb-[11vw] flex flex-col gap-14">
            <div>
                <!-- image place -->
                <h2
                    class="text-transparent text-4xl font-mont font-semibold bg-clip-text bg-gradient-casheer-title-to-b"
                    v-html="title"
                ></h2>
            </div>

            <ul class="flex flex-col gap-16">
                <li v-for="item in list" :key="item.title" class="z-10">
                    <Document :item="item"></Document>
                </li>
            </ul>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'

import Container from '@/Ui/Container.vue'

import Document from './Components/Document/Document.vue'
import DocumentInterface from './Components/Document/Type/DocumentInterface'

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)

const document = computed(() => pageData.value.data?.documents)
const title = computed<string>(() => document.value?.title)
// const description = computed<string>(() => document.value?.description)
const list = computed<Array<DocumentInterface>>(() => document.value?.list)
</script>
