<template>
    <Header></Header>
    <Content
        :on-change-package="handleSelectPackage"
        :has-selected-package="hasSelectedPackage"
    ></Content>
    <Documents v-if="hasSelectedPackage"></Documents>
    <Condition></Condition>
    <Ready></Ready>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import StateInterface from '@/Store/Modules/PageInfo/StateInterface'

import Condition from '@/Widgets/Pricing/Condition.vue'
import Content from '@/Widgets/Pricing/Content.vue'
import Documents from '@/Widgets/Pricing/Documents.vue'
import Header from '@/Widgets/Pricing/Header.vue'
import Ready from '@/Widgets/Pricing/Ready.vue'

const store = useStore<RootStateInterface>()
const pageInfo = computed<StateInterface>(() => store.state.pageInfo)
// const pageData = computed<PageDataStateInterface>(() => store.state.pageData)

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

const hasSelectedPackage = ref(false)
const handleSelectPackage = (value: boolean) => {
    hasSelectedPackage.value = value
}
</script>
