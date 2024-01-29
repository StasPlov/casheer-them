<template>
    <Header />
    <Main>
        <component :is="currentPageTemplate"></component>
    </Main>
    <Footer />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { isDevelopment, VUE_APP_WORDPRESS_PAGE_ID_HOME } from '@/env'
import { routesList, routesTemplate } from '@/routes'
import { RootStateInterface } from '@/Store'

/* Pages */
import NewsPost from '@/Pages/NewsPost.vue'

import Footer from '@/Widgets/Footer.vue'
import Header from '@/Widgets/Header.vue'
import Main from '@/Widgets/Main.vue'

const store = useStore<RootStateInterface>()

interface PropsInterface {
    pageId?: number
    ajaxUrl?: string
    pageName?: string
    pageTemplate?: string
    postType?: string
    formHtml?: string
}

const props = withDefaults(defineProps<PropsInterface>(), {
    pageId: Number(VUE_APP_WORDPRESS_PAGE_ID_HOME),
    ajaxUrl: 'http://wordpress:8888/wp-admin/admin-ajax.php',
    pageName: 'home',
    pageTemplate: 'index.php',
    postType: '',
    formHtml: '',
})

const pathname = ref(window.location.pathname)
window.addEventListener('change', () => {
    if (isDevelopment) pathname.value = window.location.pathname
})

const route = computed(() => {
    const found = routesList.findLast(({ path }) =>
        pathname.value.match(RegExp(`^${path}`)),
    )
    if (found === undefined)
        throw new Error(`No template for this pathname: ${pathname.value}`)
    return found
})

const currentPageTemplate = computed(() => {
    if (isDevelopment) {
        return route.value.template
    } else {
        type t = keyof typeof routesTemplate
        const n: t = props.pageTemplate as t
        let template = routesTemplate[n] || null

        if (props.postType === 'news-post') {
            template = NewsPost
        }

        return template
    }
})

const isInit = ref(false)

onMounted(() => {
    if (!isDevelopment) {
        store.commit('pageInfo/setPageName', props.pageName)
        store.commit('pageInfo/setAjaxUrl', props.ajaxUrl)
        store.commit('pageInfo/setPageId', props.pageId)
        store.commit('pageInfo/setPageTemplate', props.pageTemplate)
        store.commit('pageInfo/setPostType', props.postType)
        store.commit('pageInfo/setFormHtml', props.formHtml)

        return
    }
    if (!isInit.value) {
        store.commit('pageInfo/setPageName', route.value.name)
        store.commit('pageInfo/setAjaxUrl', props.ajaxUrl)
        store.commit('pageInfo/setPageId', route.value.id)
        store.commit('pageInfo/setPageTemplate', props.pageTemplate)
        store.commit('pageInfo/setPostType', props.postType)
        store.commit('pageInfo/setFormHtml', props.formHtml)
        isInit.value = true
    }
})

watch(store.state.header, () => {
    const lang = 'ar'
    if (!isDevelopment || !location.pathname.startsWith(`/${lang}/`)) return
    store.commit('header/setLang', lang)
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', 'rtl')
})
</script>

<style>
@import './Assets/Fonts/Mont/stylesheet.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --color-black1: #1b1b1b;
    --color-silver1: #959595;
    --color-violet1: #7d00e2;
    --color-green1: #00ff70;
    --color-blue1: #5066f6;
    --color-arctic1: #1cf4ff;

    background-color: var(--color-black1);
    color: white;
    cursor: default;
    font-size: 16px;
}

/* img {
    content-visibility: auto;
} */

big {
    font-weight: bold;
}

p:not(:last-child) {
    /* Каждый эелмент кроме послеженго, есил у нас больше 1 параграфа, то будет отступ */
    margin-bottom: 1.5625rem;
}

/* default transition anim */
.v-enter-active,
.v-leave-active {
    transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke, opacity, box-shadow, transform,
        filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 350ms;
    height: min-content;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    height: 0;
}

/* popup trasnition */
.popup-enter-active,
.popup-leave-active {
    transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke, opacity, box-shadow, transform,
        filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 350ms;
}

.popup-enter-from,
.popup-leave-to {
    opacity: 0;
    transform: translateY(5px);
}

/* trasnition fade top */
.fade-top-enter-active,
.fade-top-leave-active {
    transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke, opacity, box-shadow, transform,
        filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 450ms;
}

.fade-top-enter-from,
.fade-top-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
