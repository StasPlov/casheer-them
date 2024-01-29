<template>
    <Header></Header>
    <GradiendText></GradiendText>

    <template v-for="item in itemList" :key="item">
        <BlockInfo
            :image="item.image"
            :title="item.title"
            :description="item.description"
            :isReverse="item.is_reverse"
        ></BlockInfo>
    </template>

    <Payments></Payments>
    <Always></Always>
    <Man></Man>
    <Welcome></Welcome>
    <Trust></Trust>
    <Download></Download>
    <TrustedBy></TrustedBy>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'
import StateInterface from '@/Store/Modules/PageInfo/StateInterface'

import Always from '@/Widgets/Home/Always.vue'
import BlockInfo from '@/Widgets/Home/BlockInfo.vue'
import Download from '@/Widgets/Home/Download.vue'
import InfoInterface from '@/Widgets/Home/Entity/InfoInterface'
import GradiendText from '@/Widgets/Home/GradiendText.vue'
import Header from '@/Widgets/Home/Header.vue'
import Man from '@/Widgets/Home/Man.vue'
import Payments from '@/Widgets/Home/Payments.vue'
import Trust from '@/Widgets/Home/Trust.vue'
import TrustedBy from '@/Widgets/Home/TrustedBy.vue'
import Welcome from '@/Widgets/Home/Welcome.vue'

const store = useStore<RootStateInterface>()
const pageInfo = computed<StateInterface>(() => store.state.pageInfo)
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const itemList = computed<Array<InfoInterface>>(() => pageData.value.data?.info)

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
