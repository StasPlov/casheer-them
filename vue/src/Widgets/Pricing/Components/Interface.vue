<template>
    <div class="w-full">
        <div
            class="px-[9vw] pb-24 flex gap-9 max-md:flex-col max-md:items-start justify-center items-center"
        >
            <div class="flex flex-col gap-3 z-10">
                <span
                    class="text-white text-xl font-[Arial] text-center select-none"
                    v-html="productTitle"
                ></span>

                <Select
                    :list="listProd"
                    @selectItem="setSelectItemProduct"
                ></Select>
            </div>

            <div
                class="flex flex-col gap-3 z-10 transition duration-500"
                :class="{ 'opacity-20': !selectProduct }"
            >
                <span
                    class="text-white text-xl font-[Arial] text-center select-none"
                    v-html="packageTitle"
                ></span>

                <Select
                    class="z-50"
                    :list="listPack"
                    @selectItem="setSelectItemPackage"
                ></Select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import FilterInterface from '@/Entity/FilterInterface'
import TaxonomyInterface from '@/Entity/TaxonomyInterface'

import Select from './Select/Select.vue'
import SelectInterface from './Select/Type/SelectInterface'

const props = defineProps<{
    filter: {
        package_title?: string
        product_title?: string
        filter_relationship?: Array<FilterInterface>
    }
    onChangePackage(value: boolean): void
}>()

const store = useStore<RootStateInterface>()

let selectProduct = ref<TaxonomyInterface | null>(null)
let selectPackage = ref<TaxonomyInterface | null>(null)
let isInitList = ref(false)
const productTitle = computed(() => props.filter?.product_title)
const onChangePackage = computed(() => props.onChangePackage)
const packageTitle = computed(() => props.filter?.package_title)
const productList = computed(
    () => props.filter?.filter_relationship?.map(i => i.parent) ?? [],
)
const packageList = computed(() => {
    const filterList = props.filter?.filter_relationship?.filter(
        i => i.parent === selectProduct?.value,
    )
    const result: Array<TaxonomyInterface> = []
    filterList?.forEach(filter => {
        filter.child.forEach(element => {
            result.push(element.item)
        })
    })
    return result
})

let listProd = ref<Array<SelectInterface<TaxonomyInterface>>>([])
let listPack = ref<Array<SelectInterface<TaxonomyInterface>>>([])

watch(productList, () => {
    if (!isInitList.value) {
        listProd.value = initList(productList.value)
        isInitList.value = true
    }
})

watch(selectProduct, () => {
    listPack.value = initList(packageList.value)
    onChangePackage.value(false)
})

watch(selectPackage, () => {
    getPlan()
})

function setSelectItemProduct(item: TaxonomyInterface | null) {
    selectProduct.value = item
}

function setSelectItemPackage(item: TaxonomyInterface | null) {
    selectPackage.value = item
    onChangePackage.value(true)
}

function initList(
    list: Array<TaxonomyInterface>,
): Array<SelectInterface<TaxonomyInterface>> {
    return list.map(element => {
        return {
            isActive: false,
            item: element,
        } as SelectInterface<TaxonomyInterface>
    })
}

function getPlan() {
    const params = {
        'action': 'getPostList',
        'post-type': 'pricing-plan',
        'post-count': 'all',
        'taxonomy': [
            {
                taxonomy: selectProduct.value?.taxonomy,
                term: selectProduct.value?.slug,
            },
            {
                taxonomy: selectPackage.value?.taxonomy,
                term: selectPackage.value?.slug,
            },
        ],
    }

    store.dispatch('plane/getPlaneList', params)
}
</script>
