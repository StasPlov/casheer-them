<template>
    <div class="bg-white rounded-[2.5rem] z-10 text-center">
        <div class="content flex flex-col gap-12 rtl:[direction:rtl]">
            <div class="flex flex-col gap-5">
                <h2
                    class="text-black text-4xl font-bold font-mont"
                    v-html="item.title"
                ></h2>
                <span
                    class="text-black text-2xl font-normal font-[Arial]"
                    v-html="item.description"
                ></span>
            </div>

            <span
                class="text-black text-3xl font-mont"
                v-html="item.info"
            ></span>

            <ul class="flex flex-col gap-2">
                <li v-for="(item_, index) in item.list" :key="index">
                    <div class="flex gap-3">
                        <CheckIcon
                            v-if="item_.is_active"
                            class="flex-shrink-0"
                        ></CheckIcon>
                        <CheckNoneIcon
                            v-else
                            class="flex-shrink-0"
                        ></CheckNoneIcon>

                        <span
                            class="text-black text-xl font-[Arial] text-start"
                            v-html="item_.description"
                        ></span>
                    </div>
                </li>
            </ul>

            <template v-if="item.button">
                <Button
                    class="!bg-transparent btn relative !py-4 hover:scale-105 duration-500 !px-20 self-center"
                    v-if="!item.button.link && item.button.is_active"
                >
                    <span
                        class="text-black text-base font-[Arial] font-semibold"
                        >{{ item.button.text }}</span
                    >
                </Button>

                <a
                    :href="item.button?.link?.url"
                    v-else-if="item.button.is_active"
                >
                    <Button
                        class="!bg-transparent btn relative !py-4 hover:scale-105 duration-500 !px-20 self-center"
                    >
                        <span
                            class="text-black text-base font-[Arial] font-semibold"
                            >{{ item.button.text }}</span
                        >
                    </Button>
                </a>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/Widgets/Pricing/Assets/CheckIcon.vue'
import CheckNoneIcon from '@/Widgets/Pricing/Assets/CheckNoneIcon.vue'

import Button from '@/Ui/Button.vue'

import PlanInterface from './Type/PlanInterface'

defineProps<{
    item: PlanInterface
}>()
</script>

<style scoped lang="scss">
.content {
    padding: 78px 68px 56px;

    @media (max-width: 1439px) {
        padding: 62px 52px 40px;
    }

    @media (max-width: 1024px) {
        padding: 46px 36px 24px;
    }

    @media (max-width: 768px) {
        padding: 36px 36px 24px;
    }

    @media (max-width: 640px) {
        padding: 24px;
    }
}
.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    border: 5px solid transparent;
    background: radial-gradient(var(--color-blue1), transparent) border-box;
    mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
}
</style>
