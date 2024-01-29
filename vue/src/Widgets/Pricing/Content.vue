<template>
    <div class="w-full bg-[var(--color-black1)] overflow-hidden">
        <Light1
            class="absolute select-none animate-pulse top-0 z-0 rtl:left-0 max-w-full"
            draggable="false"
        ></Light1>
        <Light2
            class="absolute select-none animate-pulse z-0 rtl:left-0 max-w-full"
            draggable="false"
        ></Light2>
        <Light3
            class="absolute select-none right-0 animate-pulse z-0 max-w-full"
            draggable="false"
        ></Light3>

        <Container class="pb-[10vw]">
            <div class="flex flex-col gap-11">
                <Title :title="title" :description="description"></Title>

                <Interface
                    :filter="filter"
                    :on-change-package="onChangePackage"
                ></Interface>
            </div>
        </Container>
        <PlanList v-if="hasSelectedPackage" :list="planeList"></PlanList>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import FilterInterface from '@/Entity/FilterInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'
import PlaneDataStateInterface from '@/Store/Modules/Plane/StateInterface'

import Container from '@/Ui/Container.vue'

import Light1 from './Assets/Light1.vue'
import Light2 from './Assets/Light2.vue'
import Light3 from './Assets/Light3.vue'
import Interface from './Components/Interface.vue'
import PlanList from './Components/PlanList.vue'
import Title from './Components/Title.vue'
import PlaneListResponseInterface from './Components/Type/PlaneListResponseInterface'

const props = defineProps<{
    onChangePackage(value: boolean): void
    hasSelectedPackage: boolean
}>()

const onChangePackage = computed(() => props.onChangePackage)
const hasSelectedPackage = computed(() => props.hasSelectedPackage)

const store = useStore<RootStateInterface>()
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const planeData = computed<PlaneDataStateInterface>(() => store.state.plane)

const content = computed(() => pageData.value.data?.content)
const filter = computed<Array<FilterInterface>>(
    () => pageData.value.data?.filter,
)
const title = computed<string>(() => content.value?.title)
const description = computed<string>(() => content.value?.description)
const planeListData = computed<Array<PlaneListResponseInterface>>(
    () => planeData.value.planeList,
)

const planeList = computed(() => planeListData.value.map(i => i.data))
</script>
