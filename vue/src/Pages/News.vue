<template>
    <div
        class="newsRoot bg-[var(--color-black1)] min-h-screen relative"
        v-if="pageInfo"
    >
        <Light1 class="absolute top-0 left-0 animate-pulse" />
        <Light2 class="absolute top-0 left-0 animate-pulse" />
        <Light3 class="absolute bottom-[-26.75rem] right-0 animate-pulse" />

        <Container
            class="newsListContainer flex flex-col gap-11 max-phoneX:gap-11"
        >
            <div
                class="flex flex-col gap-14 max-phoneX:gap-11"
                v-show="newsList"
            >
                <div class="newsGrid">
                    <div>
                        <NewsItem
                            large
                            :item="newsFirst"
                            class="newsItemLarge"
                        />
                    </div>

                    <div class="asideDivider" />

                    <div class="asideList">
                        <NewsItem :item="newsTwo" />

                        <NewsItem :item="newsThree" />
                    </div>
                </div>

                <hr class="divider" />

                <ul class="secondaryList">
                    <TransitionGroup>
                        <li
                            v-for="item in list"
                            :key="item.link"
                            refs="itemsListAnim"
                            class="max-phoneX:first:pt-7"
                        >
                            <NewsItem
                                class="text-[0.8125rem] newsItemWithinList"
                                within-list
                                :item="item"
                            />
                        </li>
                    </TransitionGroup>
                </ul>
            </div>

            <Button
                class="bg-transparent self-center !p-0 z-10"
                v-if="button?.is_active"
                @click="loadMore"
                :class="{ 'opacity-20': isMaxPostLoad }"
            >
                <span
                    class="text-white text-3xl font-bold font-mont underline text-center"
                    >{{ button.text }}</span
                >
            </Button>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ButtonInterface from '@/Entity/ButtonInterface'
import NewsPageDataInterface from '@/Entity/NewsPageDataInterface'

import PageDataStateInterface from '@/Store/Modules/PageData/StateInterface'
import StateInterface from '@/Store/Modules/PageInfo/StateInterface'
import PostStateInterface from '@/Store/Modules/Post/StateInterface'

import Light1 from '@/Widgets/News/Assets/Light1.vue'
import Light2 from '@/Widgets/News/Assets/Light2.vue'
import Light3 from '@/Widgets/News/Assets/Light3.vue'
import NewsItem from '@/Widgets/News/News.vue'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

gsap.registerPlugin(ScrollTrigger)

const store = useStore<RootStateInterface>()
const pageInfo = computed<StateInterface>(() => store.state.pageInfo)

const pageData = computed<PageDataStateInterface>(() => store.state.pageData)
const newsList = computed<Array<NewsPageDataInterface>>(
    () =>
        (store.state.post as PostStateInterface<NewsPageDataInterface>)
            .postList,
)
const newsTotalCount = computed<number>(
    () => (store.state.post as PostStateInterface).totalCount,
)
const list = computed(() =>
    newsList.value.filter(
        i =>
            i !== newsFirst.value &&
            i !== newsTwo.value &&
            i !== newsThree.value,
    ),
)
const isMaxPostLoad = computed(
    () => newsList.value.length === newsTotalCount.value,
)

const button = computed<ButtonInterface>(() => pageData.value.data?.button)

const newsFirst = computed<NewsPageDataInterface>(
    () => newsList?.value[0] || null,
)
const newsTwo = computed<NewsPageDataInterface>(
    () => newsList?.value[1] || null,
)
const newsThree = computed<NewsPageDataInterface>(
    () => newsList?.value[2] || null,
)

let isInitData = ref(false)
let curentPageNum = ref(1)
let postCount = ref(6)

watch(pageInfo.value, () => {
    if (!isInitData.value) {
        store.dispatch('pageData/getPageData', {
            // eslint-disable-next-line
            'action': 'getData',
            'page-name': pageInfo.value.pageName,
            'page-id': pageInfo.value.pageId,
        })

        store.dispatch('post/getPostList', {
            // eslint-disable-next-line
            'action': 'getPostList',
            'post-type': 'news-post',
            'post-count': postCount.value,
            'page-num': curentPageNum.value,
        })

        isInitData.value = true
    }
})

watchEffect(
    () => {
        animateItemList()
    },
    { flush: 'post' },
)

function loadMore() {
    if (isMaxPostLoad.value) {
        return
    }

    curentPageNum.value++

    store.dispatch('post/addPostList', {
        // eslint-disable-next-line
        'action': 'getPostList',
        'post-type': 'news-post',
        'post-count': postCount.value,
        'page-num': curentPageNum.value,
    })
}

function animateItemList() {
    const elem = Array.from(
        document.querySelectorAll<HTMLElement>('[refs="itemsListAnim"]'),
    )

    gsap.utils.toArray<HTMLElement>(elem).forEach((element, i) => {
        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: '50px',
            },
            {
                opacity: 1,
                autoAlpha: 1,
                delay: i * 0.25,
                duration: 2,
                y: '0',
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reset',
                },
            },
        )
    })
}
</script>
<style scoped lang="scss">
.newsRoot {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.newsListContainer {
    position: relative;
    z-index: 1;
    padding-top: 1.5rem;
    padding-bottom: 2.5rem;
}

.newsGrid {
    display: flex;
    gap: 1.5rem;
    flex-flow: column;

    @media (min-width: 1024px) {
        flex-flow: row;
        align-items: stretch;
    }
}

.newsItemLarge,
.newsItemWithinList {
    height: 100%;
}

.asideList {
    position: relative;
    display: flex;
    flex-flow: column;
    gap: 2.5rem;
    font-size: 0.8334em;

    @media (min-width: 1024px) {
        min-width: 24rem;
    }
}

.asideDivider {
    border-bottom: 3px solid;

    @media (min-width: 1024px) {
        border-bottom: unset;
        border-right: 3px solid;
    }
}

.divider {
    border: unset;
    border-top: 3px solid;
}

.secondaryList {
    display: grid;
    gap: 1.875rem;
    grid-template-columns: var(--columns);

    @media (min-width: 768px) {
        --columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        --columns: repeat(3, 1fr);
    }
}
</style>
