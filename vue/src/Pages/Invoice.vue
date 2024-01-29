<template>
    <Header></Header>
    <Technology></Technology>

    <InfoListBlock :list="infoListBlock"></InfoListBlock>

    <Info></Info>

    <LetsLaunch
        :title="LLtitle"
        :image="LLimage"
        :step-image="LLstepImage"
        :color="LLcolor"
        :step-list="LLstepList"
        :action="LLaction"
    ></LetsLaunch>

    <OurBusinessProduct
        :title="OBPtitle"
        :product-list="OBPproductList"
    ></OurBusinessProduct>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import ImageInterface from '@/Entity/ImageInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'
import StateInterface from '@/Store/Modules/PageInfo/StateInterface'

import InfoListBlock from '@/Widgets/InfoListBlock/InfoListBlock.vue'
import InfoInterface from '@/Widgets/InfoListBlock/Type/InfoInterface'
import Header from '@/Widgets/Invoice/Header.vue'
import Info from '@/Widgets/Invoice/Info.vue'
import Technology from '@/Widgets/Invoice/Technology.vue'
import LetsLaunch from '@/Widgets/LetsLaunch/LetsLaunch.vue'
import ActionInterface from '@/Widgets/LetsLaunch/Type/ActionInterface'
import StepInterface from '@/Widgets/LetsLaunch/Type/StepInterface'
import OurBusinessProduct from '@/Widgets/OurBusinessProduct/OurBusinessProduct.vue'
import ProductInterface from '@/Widgets/OurBusinessProduct/Type/ProductInterface'

const store = useStore<RootStateInterface>()

const pageInfo = computed<StateInterface>(() => store.state.pageInfo)
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)

const data = computed(() => pageData.value.data?.info_list_block)
const dataLetsLaunchBlock = computed(
    () => pageData.value.data?.lets_launch_block,
)
const dataOurBusinessProductBlock = computed(
    () => pageData.value.data?.our_business_product_block,
)

/* InfoListBlock */
const infoListBlock = computed<Array<InfoInterface>>(() => data.value?.items)

/* LetsLaunch */
const LLstepList = computed<Array<StepInterface>>(
    () => dataLetsLaunchBlock.value?.step_list,
)
const LLaction = computed<ActionInterface>(
    () => dataLetsLaunchBlock.value?.action,
)
const LLcolor = computed<string>(() => dataLetsLaunchBlock.value?.color)
const LLimage = computed<ImageInterface>(() => dataLetsLaunchBlock.value?.image)
const LLstepImage = computed<ImageInterface>(
    () => dataLetsLaunchBlock.value?.step_image,
)
const LLtitle = computed<string>(() => dataLetsLaunchBlock.value?.title)

/* OurBusinessProductBlock */
const OBPproductList = computed<Array<ProductInterface>>(
    () => dataOurBusinessProductBlock.value?.product_list,
)
const OBPtitle = computed<Array<ProductInterface>>(
    () => dataOurBusinessProductBlock.value?.title,
)

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
