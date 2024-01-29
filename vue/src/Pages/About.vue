<template>
    <Header></Header>
    <Planet></Planet>
    <Take></Take>
    <Promise></Promise>
    <LetsTalk></LetsTalk>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import Header from '@/Widgets/AboutUs/Header.vue'
import LetsTalk from '@/Widgets/AboutUs/LetsTalk.vue'
import Planet from '@/Widgets/AboutUs/Planet.vue'
import Promise from '@/Widgets/AboutUs/Promise.vue'
import Take from '@/Widgets/AboutUs/Take.vue'

const store = useStore<RootStateInterface>()
const pageInfo = computed(() => store.state.pageInfo)

let isInitData = ref(false)

watch(pageInfo.value, () => {
    if (!isInitData.value) {
        store.dispatch('pageData/getPageData', {
            // eslint-disable-next-line
            'action': 'getData',
            'page-name': pageInfo.value.pageName,
            'page-id': pageInfo.value.pageId,
        })

        isInitData.value = true
    }
})
</script>
