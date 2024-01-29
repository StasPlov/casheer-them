<template>
    <Header v-if="post" :image="postImage"></Header>

    <NewsPostContent
        v-if="post"
        :post="post"
        :button="button"
    ></NewsPostContent>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { namedRoutes } from '@/routes'
import { RootStateInterface } from '@/Store'

import ButtonInterface from '@/Entity/ButtonInterface'
import ImageInterface from '@/Entity/ImageInterface'
import NewsPageDataInterface from '@/Entity/NewsPageDataInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'
import StateInterface from '@/Store/Modules/PageInfo/StateInterface'
import PostStateInterface from '@/Store/Modules/Post/StateInterface'

import NewsPostContent from '@/Widgets/NewsPost/Content.vue'
import Header from '@/Widgets/NewsPost/Header.vue'

const store = useStore<RootStateInterface>()
const pageInfo = computed<StateInterface>(() => store.state.pageInfo)
const pageData = computed<PageDataStateInterface>(() => store.state.pageData)

const post = computed<NewsPageDataInterface>(
    () =>
        (store.state.post as PostStateInterface<NewsPageDataInterface>)
            .postList[0] || undefined,
)
const postImage = computed<ImageInterface>(() => post?.value?.data?.image)
const button = computed<ButtonInterface>(() => pageData?.value?.data?.button)

let isInitData = ref(false)

watch(pageInfo.value, () => {
    if (!isInitData.value) {
        store.dispatch('pageData/getPageData', {
            'action': 'getData',
            'page-name': 'news',
            'page-id': pageInfo.value.pageId,
        })

        const slug = location.pathname.match(
            RegExp(`${namedRoutes.newsPost.path}(.*)`),
        )?.[1]

        store.dispatch('post/getPostList', {
            'action': 'getPostList',
            'post-slug': slug,
        })

        isInitData.value = true
    }
})
</script>
