<template>
    <footer class="flex flex-col bg-[var(--color-black1)]" v-if="data">
        <Container
            v-if="contactData"
            class="py-[2vw] pb-[3vw] max-phoneX:pt-[5vw] border-t-[3px] border-white flex flex-col gap-8 items-center"
        >
            <div class="flex flex-col gap-7">
                <h2
                    class="text-white text-3xl font-bold font-mont text-center max-phoneX:text-[26px]"
                    v-html="contactData.title"
                ></h2>

                <Button class="gap-5 phoneButton">
                    <img :src="iconCollIcon" alt="" class="h-5" />
                    <span
                        class="footerPhoneNumber text-base text-white font-semibold font-[Arial] tracking-wide max-phoneX:text-[10px]"
                        v-html="contactData.phone"
                    ></span>
                </Button>
            </div>

            <div class="flex flex-col gap-7 items-center w-full">
                <h3
                    class="text-xl text-white font-normal font-[Arial] max-phoneX:text-[13px]"
                    v-html="contactData.input_title"
                ></h3>

                <div
                    ref="ninjaForm"
                    class="max-w-[48.125rem] w-full relative"
                ></div>
            </div>
        </Container>

        <Container
            class="py-[2vw] pb-[4vw] max-phoneX:py-[5vw] border-t-[3px] border-white w-full flex flex-col gap-20"
        >
            <div class="flex flex-col gap-8">
                <a href="/">
                    <img
                        v-if="logo"
                        :src="logo.url"
                        alt=""
                        class="w-[10rem] select-none"
                        draggable="false"
                    />
                </a>

                <div class="grid grid-cols-3 gap-4">
                    <div
                        class="flex flex-col gap-4"
                        v-for="menu in menuList"
                        :key="menu.title"
                    >
                        <h2
                            class="text-white text-base font-[Arial] font-semibold"
                            v-if="menu.title"
                        >
                            {{ menu.title }}
                        </h2>

                        <ul class="flex flex-col gap-4">
                            <li v-for="(item, index) in menu.list" :key="index">
                                <a
                                    :href="item.link.url"
                                    v-if="item.link !== ''"
                                    class="text-white text-base font-normal font-[Arial]"
                                    >{{ item.text }}</a
                                >
                                <span
                                    class="text-white text-base font-normal font-[Arial]"
                                    v-else
                                    >{{ item.text }}</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <ul class="flex gap-16 max-phoneX:gap-10 max-phoneM:gap-6">
                    <li v-for="item in socialList" :key="item.image.id">
                        <template v-if="item.link">
                            <a :href="item.link.url">
                                <img
                                    v-if="item.image"
                                    :src="item.image.url"
                                    alt=""
                                    class="select-none max-w-[2.875rem] object-contain"
                                    draggable="false"
                                />
                            </a>
                        </template>

                        <img
                            v-else-if="item.image"
                            :src="item.image.url"
                            alt=""
                            class="select-none max-w-[2.875rem] object-contain"
                            draggable="false"
                        />
                    </li>
                </ul>
            </div>

            <div class="flex justify-center items-center px-11" v-if="info">
                <span
                    class="text-white text-base font-[Arial] font-normal text-center"
                    v-html="info"
                ></span>
            </div>
        </Container>
    </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useStore } from 'vuex'

import { RootStateInterface } from '@/Store'

import Button from '@/Ui/Button.vue'
import Container from '@/Ui/Container.vue'

import iconCollIcon from '@/Assets/Icons/icon_coll.svg'

const store = useStore<RootStateInterface>()

const data = computed(() => store.state.footer.data?.footer)

const contactData = computed(() => store.state.footer.data?.contact_us)

const socialList = computed(() => data.value?.social ?? [])
const menuList = computed(() => data.value?.menu ?? [])
const info = computed(() => data.value?.info)
const logo = computed(() => data.value?.logo)

let isInitData = ref(false)
const ninjaForm = ref<HTMLDivElement | null>(null)

watch(ninjaForm, () => {
    // init Form
    const form = document.getElementById('ninjaForm1')
    if (form === null) {
        return
    }
    form.removeAttribute('hidden')
    const { value } = ninjaForm
    if (value === null) return
    value.append(form)
})

// watch(contactData, value => {
//     if (value === undefined) return
//     const { ninja_form: form, ninja_form_html: html } = value
//     console.log({ html })
//     const { id } = form
//     const ref = ninjaForm.value
//     if (ref === null) return
//     const instance = new NinjaFormDynamicLoader(Number(id), ref, html, '', {
//         'nf-front-end': {
//         },
//         'nf-front-end-deps': {
//         },
//     })
//     instance.load()
//     // const form = ninjaForm.value
//     // if (form !== null) {
//     //     console.log({ html })
//     //     setTimeout(() => {
//     //         form.innerHTML = html
//     //     }, 100)
//     // }
// })

onMounted(() => {
    if (!isInitData.value) {
        store.dispatch('footer/getData', {
            'action': 'getData',
            'page-name': 'footer-setup',
        })

        isInitData.value = true
    }
})
</script>
<style scoped>
.phoneButton {
    border-radius: 10px;
    padding: 1rem 2rem;
}

.footerPhoneNumber {
    direction: ltr;
}
</style>
<style>
input.ninja-forms-field[type='email'] {
    border: 3px solid white;
    max-width: 48.125rem;
    border-radius: 6.25rem !important;
    padding: 0.8rem 6.875rem 0.9rem 2rem;
    color: var(--color-silver1);
    font-size: 1rem;
    line-height: 1.75rem;
    font-family: Arial;
    background: transparent;
}

[dir='rtl'] input.ninja-forms-field[type='email'] {
    padding-right: 2rem;
    padding-left: 6.875rem;
}

input.ninja-forms-field[type='submit'] {
    width: 1.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-violet1);
    color: white;
    height: auto;
    padding: 0.625rem 1.25rem;
    border-radius: 1.875rem;
    transition: 500ms;
}

input.ninja-forms-field[type='submit']:hover {
    filter: brightness(115%);
}

.nf-form-fields-required {
    display: none;
}

.nf-field-container.submit-container {
    position: absolute;
    margin: 0;
    right: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3.75rem;
    max-height: 3.75rem;
}

.nf-form-content {
    padding: unset;
}

[dir='rtl'] .nf-field-container.submit-container {
    right: auto;
    left: -0.75rem;
}

.nf-field-container.email-container {
    width: 100% !important;
}

.nf-response-msg {
    text-align: center;
    color: white;
}
</style>
<style>
.nf-form-wrap {
    --height: 68px;
}

:root:root .nf-form-content input.ninja-forms-field {
    height: var(--height);
    border-width: 3px;
}

:root:root .nf-form-content input.ninja-forms-field,
:root:root .nf-form-content input.ninja-forms-field:focus {
    background: transparent;
    color: white;
}

:root:root input.ninja-forms-field[type='submit'] {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    padding: unset;
}

:root:root .nf-field-container.submit-container {
    width: unset;
    height: auto;
    max-width: unset;
    max-height: unset;
}

:root:root .nf-field-container.one-half {
    float: left;
    clear: none;
}

:root:root input.ninja-forms-field[type='submit'] {
    background-color: var(--color-violet1);
    background-image: url('@/Assets/Icons/send.svg');
    background-position: center;
    background-repeat: no-repeat;
    color: transparent;
    cursor: pointer;
}

:root:root .nf-form-content {
    padding: unset;
}

input.ninja-forms-field[type='email'] {
    max-width: unset;
}

:root:root .submit-wrap .nf-field-element {
    width: var(--height);
    height: var(--height);
    display: flex;
    align-items: center;
    justify-content: center;
}

.nf-error.field-wrap .nf-field-element:after,
.nf-pass.field-wrap .nf-field-element:after {
    display: none;
}

.nf-after-field {
    text-align: center;
}

.nf-error-msg.nf-error-field-errors {
    text-align: center;
}
</style>
