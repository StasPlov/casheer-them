<template>
    <header class="headerRoot">
        <Container size="large" class="headerContainer">
            <a href="/" class="self-center pr-[1rem]">
                <img
                    :src="logo.url"
                    v-if="logo"
                    alt=""
                    class="max-w-[207px] object-contain max-sm:max-w-[141px] max-phoneM:max-w-[110px]"
                    draggable="false"
                />
            </a>

            <div class="flex items-center justify-end">
                <div
                    v-if="ButtonCountry && ButtonCountry.is_active"
                    class="relative"
                >
                    <Button
                        class="bg-transparent gap-2 max-sm:px-2 max-phoneM:px-1 max-sm:gap-1"
                        @click="countryMenuIsOpen = !countryMenuIsOpen"
                    >
                        <span
                            class="text-white max-sm:text-xs font-normal underline"
                            >{{ ButtonCountry.text }}</span
                        >
                        <ArrowIcon
                            class="trasition duration-500 rotate-90"
                            :class="{ '!rotate-0': countryMenuIsOpen }"
                        ></ArrowIcon>
                    </Button>

                    <Transition name="fade-top">
                        <div
                            class="absolute z-[51] px-5 py-3 bg-[var(--color-black1)] rounded-2xl right-0 min-w-max"
                            v-if="countryMenuIsOpen"
                            v-click-outside="clickOutsideCountry"
                        >
                            <ul class="flex flex-col gap-2">
                                <li
                                    v-for="item in countryList"
                                    :key="item.link.url"
                                    class="max-w-max transition duration-300 hover:scale-105"
                                >
                                    <a
                                        :href="item.link.url"
                                        class="flex gap-3 cursor-default"
                                    >
                                        <img
                                            v-if="item.image"
                                            :src="item.image.url"
                                            alt=""
                                            class="h-5 object-contain"
                                        />
                                        <span
                                            class="text-white max-sm:text-sm font-normal"
                                            >{{ item.title }}</span
                                        >
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>

                <a
                    :href="ButtonLogin.link.url"
                    v-if="ButtonLogin && ButtonLogin.is_active"
                >
                    <Button
                        class="bg-transparent max-sm:px-2 max-phoneM:px-1 max-sm:gap-1"
                    >
                        <span
                            class="text-white max-sm:text-xs font-normal underline"
                            >{{ ButtonLogin.text }}</span
                        >
                    </Button>
                </a>

                <a
                    :href="buttonSignUp.link.url"
                    v-if="buttonSignUp && buttonSignUp.is_active"
                >
                    <Button
                        class="bg-transparent max-sm:px-2 max-phoneM:px-1 max-sm:gap-1"
                    >
                        <span
                            class="text-white max-sm:text-xs font-normal underline"
                            >{{ buttonSignUp.text }}</span
                        >
                    </Button>
                </a>

                <div v-if="currentLang" class="relative">
                    <Button
                        class="bg-transparent gap-2 max-sm:px-2 max-phoneM:px-1 max-sm:gap-1"
                        @click="langMenuIsOpen = !langMenuIsOpen"
                    >
                        <span
                            class="text-white max-sm:text-xs font-normal underline uppercase"
                            >{{ currentLang.slug }}</span
                        >
                        <ArrowIcon
                            class="trasition duration-500 rotate-90"
                            :class="{ '!rotate-0': langMenuIsOpen }"
                        ></ArrowIcon>
                    </Button>

                    <Transition name="fade-top">
                        <div
                            class="absolute z-[51] px-5 py-3 bg-[var(--color-black1)] rounded-2xl right-0 min-w-max left-0"
                            v-if="langMenuIsOpen"
                            v-click-outside="clickOutsideLang"
                        >
                            <ul class="flex flex-col gap-2">
                                <li
                                    v-for="item in langListFiltered"
                                    :key="item.id"
                                    class="max-w-max transition duration-300 hover:scale-105"
                                >
                                    <div class="flex gap-3">
                                        <!-- <img :src="item.flag" alt="" class="h-5 object-contain"> -->
                                        <a
                                            :href="item.url"
                                            class="text-white max-sm:text-sm font-normal cursor-default uppercase"
                                            :class="{
                                                'font-medium':
                                                    item.current_lang,
                                            }"
                                            >{{ item.slug }}</a
                                        >
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>

                <Button
                    class="bg-transparent max-w-[4.0625rem] max-sm:px-2 max-phoneM:px-1 max-sm:gap-1 menuButton"
                    @click="menuIsOpen = !menuIsOpen"
                >
                    <MenuIcon v-if="!menuIsOpen"></MenuIcon>
                    <MenuIconClose v-else></MenuIconClose>
                </Button>
            </div>
        </Container>
        <Teleport to="body">
            <Transition name="fade-top">
                <div class="navRoot" v-if="menuIsOpen">
                    <div class="navLayout" v-click-outside="clickOutside">
                        <ul
                            class="navList navListA"
                            v-if="menu"
                            v-click-outside="clickOutside"
                        >
                            <TransitionGroup name="popup">
                                <li
                                    v-for="item in menu"
                                    :key="item.link.url"
                                    class="transition duration-500 hover:translate-x-3 group navItem"
                                >
                                    <a
                                        :href="item.link.url"
                                        class="navLink transition duration-500 group-hover:text-gray-200"
                                        >{{ item.title }}</a
                                    >
                                </li>
                            </TransitionGroup>
                        </ul>

                        <ul
                            class="navList navListB"
                            v-if="menuTwo"
                            v-click-outside="clickOutside"
                        >
                            <TransitionGroup name="popup">
                                <li
                                    v-for="item in menuTwo"
                                    :key="item.link.url"
                                    class="transition duration-500 hover:translate-x-3 group navItem"
                                >
                                    <a
                                        :href="item.link.url"
                                        class="navLink transition duration-500 group-hover:text-gray-200"
                                        >{{ item.title }}</a
                                    >
                                </li>
                            </TransitionGroup>
                        </ul>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </header>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import vClickOutside from '@/Service/ClickOutside'

import LangInterface from '@/Entity/LangInterface'
import LinkInterface from '@/Entity/LinkInterface'

import ArrowIcon from '@/Widgets/Header/Assets/ArrowIcon.vue'
import MenuIcon from '@/Widgets/Header/Assets/MenuIcon.vue'
import MenuIconClose from '@/Widgets/Header/Assets/MenuIconClose.vue'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

const store = useStore<RootStateInterface>()

type MenuItem = {
    title: string
    link: LinkInterface
}

const data = computed(() => store.state.header.data)
const pageId = computed(() => store.state.pageInfo.pageId)
const logo = computed(() => data.value?.logo)
const ButtonCountry = computed(() => data.value?.button_country)
//const ButtonLang = computed(() => data.value?.button_lang);
const ButtonLogin = computed(() => data.value?.button_login)
const buttonSignUp = computed(() => data.value?.button_sign_up)
const menu = computed(() => data.value?.menu ?? [])
const menuTwo = computed<MenuItem[]>(() => data.value?.menu_two ?? [])
const countryList = computed(() => data.value?.country_list ?? [])
const langList = computed(() => data?.value?.lang)
const currentLang = computed<LangInterface | null>(() =>
    langList?.value
        ? Object.values(langList?.value).find(lang => lang.current_lang) ?? null
        : null,
)
const langListFiltered = computed(() =>
    Object.values(langList?.value ?? {}).filter(i => !i.current_lang),
)

let menuIsOpen = ref(false)
let langMenuIsOpen = ref(false)
let countryMenuIsOpen = ref(false)
let isInitData = ref(false)

watch(
    pageId,
    () => {
        if (!isInitData.value) {
            store.dispatch('header/getData', {
                // eslint-disable-next-line
                'action': 'getData',
                'page-name': 'header-setup',
                'page-id': pageId.value,
            })

            isInitData.value = true
        }
    },
    { flush: 'post' },
)

function clickOutside() {
    menuIsOpen.value = false
}

function clickOutsideLang() {
    langMenuIsOpen.value = false
}

function clickOutsideCountry() {
    countryMenuIsOpen.value = false
}
</script>
<style>
:root {
    --header-height: 5.6875rem;
}
</style>
<style scoped>
.headerRoot {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: var(--color-black1);
}

.headerContainer {
    display: flex;
    justify-content: space-between;
    height: var(--header-height);

    @media screen and (max-width: 400px) {
        justify-content: space-around;
    }
}

.self-center,
.menuButton {
    @media screen and (max-width: 400px) {
        transform: scale(0.6);
    }
}

.navRoot {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 51;
    width: 100%;
    height: calc(100% - var(--header-height));
    backdrop-filter: blur(44px);
}

.navLayout {
    display: flex;
    justify-content: center;
    gap: 10rem;
    width: 100%;
    padding-inline: 3rem;

    @media (max-width: 768px) {
        flex-flow: column;
        gap: 1.8rem;
    }
}

.navList {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    font-size: 2.5rem;
    width: 100%;

    @media (max-width: 768px) {
        font-size: 1.6rem;
    }

    @media (max-width: 375px) {
        font-size: 1.4rem;
    }
}

.navListA {
    max-width: 22rem;
    text-transform: uppercase;
}

.navListB {
    max-width: 28rem;
    font-weight: 800;
}

.navItem {
    line-height: 1;
}

.navLink {
    display: inline-block;
    padding-block: 0.35em;
}
</style>
