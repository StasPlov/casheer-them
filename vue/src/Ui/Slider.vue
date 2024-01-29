<template>
    <div ref="sliderParent" class="transform-gpu">
        <component
            :is="sliderTag"
            :class="sliderClass"
            ref="slider"
            @mousedown.stop="startEvent"
            @mousemove.stop="moveEvent"
            @mouseup="stopEvent"
            @mouseleave="stopEvent"
            @touchstart.stop="startEvent"
            @touchmove.stop="moveEvent"
            @touchend="stopEvent"
            @touchcancel="stopEvent"
        >
            <slot>Нет элементов</slot>
        </component>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue'

import Mathf from '@/Service/Mathf'

const props = defineProps({
    /**
     * @description Количество видимых элементов в окне
     */
    elementViewCount: {
        type: Number,
        default: 0,
        require: false,
    },
    /**
     * @description HTML тег слайдера
     */
    sliderTag: {
        type: String,
        default: 'div',
        require: false,
    },
    /**
     * @description CSS Классы слайдера
     */
    sliderClass: {
        type: String,
        default: '',
        require: false,
    },
    /**
     * @description Количество прокручиваемых элементов за один слайд
     */
    slideCountElement: {
        type: Number,
        default: 0,
        require: false,
    },
    /**
     * @description Начальный индекс/номер слайда
     */
    startSlideIndex: {
        type: Number,
        default: 0,
        require: false,
    },
    /**
     * @description Бесконечный скролл или нет
     */
    infinityScroll: {
        // !!!!!!! доделать
        type: Boolean,
        default: false,
        require: false,
    },
    /**
     * @description Cвободный скролл или нет (отменяте slideCountElement)
     */
    freeScroll: {
        type: Boolean,
        default: false,
        require: false,
    },
    /**
     * @description Не выходить за последние элементы в слайдере
     */
    checkBounding: {
        type: Boolean,
        default: true,
        require: false,
    },
    /**
     * @description Авто выравнивание по завершению скролла
     */
    autoAlignment: {
        // !!!!!! доделать
        type: Boolean,
        default: true,
        require: false,
    },
})

const emit = defineEmits<{ (event: 'selectSlide', index: number): void }>()

let isMove = ref(false)
let isTouch = ref(false)
let moveSpeed = ref(1)
let moveLoopStopCoefficient = ref(0.95)
// let moveBoundingStopCoefficient = ref(0.65)
let startPositionX = ref(0)
let startPositionY = ref(0)
let movePositionX = ref(0)
let moveVelocityX = ref(0)
let movePositionY = ref(0)
let moveVelocityY = ref(0)
let minimumVelocityX = ref(7) // to touch or min tap slide
// let minimumVelocityY = ref(7)
let slideChangeSpeed = ref(300) // ms
let animationFrame = ref(0)

const moveVelocityDirectionX = computed(() => Math.sign(moveVelocityX.value))
const slider: Ref<HTMLElement | null> = ref(null)
const sliderParent: Ref<HTMLElement | null> = ref(null)
// const sliderParentOffset = computed(() => movePositionX)
const elements: Ref<Array<HTMLElement>> = computed(
    () => Array.from(slider.value?.children ?? []) as Array<HTMLElement>,
)
// const sliderWidth = computed(() => {
//     const lastElement: HTMLElement = elements.value[elements.value.length - 1]
//     return lastElement.offsetLeft + lastElement.offsetWidth
// })

/* elementCount: {
    get() {
        let countElement = this.slideCountElement ?? 0;
        if(countElement <= 0) {
            countElement = this.elementViewCount ?? 0;

            if(countElement <= 0) {
                countElement = this.elements.length;
            }
        }
        return  countElement;
    }
}, */
const slidePositionList = computed(() => {
    // return static slide position
    let countElement: number = props.slideCountElement ?? 0
    if (countElement <= 0) {
        countElement = props.elementViewCount ?? 0

        if (countElement <= 0) {
            countElement = elements.value.length
        }
    }

    if (props.slideCountElement <= 0 && props.elementViewCount <= 0) {
        countElement = 1
    }

    if (props.freeScroll) {
        countElement = 1
    }

    const distanceList: Array<number> = elements.value.map(
        i => i.offsetLeft * countElement,
    )

    const deleteCount: number = Math.ceil(elements.value.length / countElement) // slice to need count elements
    return distanceList.slice(0, deleteCount)
})

const slideDistanceList = computed(() =>
    slidePositionList.value.map(i => Math.abs(i + movePositionX.value)),
)
const slideDistanceMinIndex = computed(() =>
    slideDistanceList.value.indexOf(Math.min(...slideDistanceList.value)),
)
const nextSlidePosition = computed(
    () => slidePositionList.value[slideDistanceMinIndex.value],
)
const nextSlidePositionPermanent = computed(() => {
    const index: number = Mathf.clamp(
        slideDistanceMinIndex.value + 1,
        0,
        slideDistanceList.value.length - 1,
    )
    return slidePositionList.value[index]
})
const prevSlidePositionPermanent = computed(() => {
    const index: number = Mathf.clamp(
        slideDistanceMinIndex.value - 1,
        0,
        slideDistanceList.value.length - 1,
    )
    return slidePositionList.value[index]
})
const sliderOutDistance = computed(() => {
    if (!props.checkBounding) {
        return 0
    }

    let count = props.elementViewCount
    if (!count) {
        count = props.slideCountElement
    }
    if (
        !props.slideCountElement &&
        props.freeScroll &&
        !props.elementViewCount
    ) {
        count = slidePositionList.value.length - 1
    }

    let countView: number = Mathf.clamp(
        count,
        1,
        slidePositionList.value.length,
    )

    const index: number = slidePositionList.value.length - countView
    const lastDistance: number = slidePositionList.value[index]

    const lastDiff: number =
        movePositionX.value < 0 && Math.abs(movePositionX.value) > lastDistance
            ? Math.abs(movePositionX.value) - lastDistance
            : 0
    const firstDiff: number = movePositionX.value > 0 ? -movePositionX.value : 0

    const result: number =
        firstDiff < 0 ? firstDiff : lastDiff > 0 ? lastDiff : 0
    return result
})

onMounted(() => {
    slider.value?.addEventListener('transitionend', () => {
        emit('selectSlide', slideDistanceMinIndex.value)
    })
    init()
})

function init() {
    if (slider.value === null) return
    const stylesParent: CSSStyleDeclaration = window.getComputedStyle(
        slider.value,
        null,
    )
    // const elementCount: number = elements.value.length

    if (Number.isInteger(props.startSlideIndex)) {
        const index: number = Mathf.clamp(
            props.startSlideIndex,
            0,
            elements.value.length - 1,
        )
        movePositionX.value = -elements.value[index].offsetLeft
        translateTo(movePositionX.value)
    }

    if (props.elementViewCount) {
        for (const element of elements.value) {
            // bind this scrollTo function to child list use <slot>
            //iterator.addEventListener("click", this.scrollTo);
            const stylesElement: CSSStyleDeclaration = window.getComputedStyle(
                element,
                null,
            )

            let marginSum: number = 0
            let gapSumm: number = 0
            let sum: number = 0

            if (!isNaN(parseFloat(stylesParent.rowGap))) {
                gapSumm += parseFloat(stylesParent.rowGap)
            }

            if (
                !isNaN(
                    parseFloat(stylesElement.marginLeft) +
                        parseFloat(stylesElement.marginRight),
                )
            ) {
                marginSum +=
                    parseFloat(stylesElement.marginLeft) +
                    parseFloat(stylesElement.marginRight)
            }

            sum += gapSumm + marginSum

            const result: number =
                (sum / props.elementViewCount) * (props.elementViewCount - 1)
            const definition: string = result ? ` - ${result}px` : ''

            if (props.elementViewCount) {
                element.style.minWidth = `calc(100%/${props.elementViewCount}${definition})`
            }
        }
    }
}

function startEvent(e: any) {
    if (slider.value === null) return
    isMove.value = true
    isTouch.value = e.type === 'touchstart' // set true
    //document.body.style.overflow = 'hidden';
    const input = isTouch.value ? e.touches[0] : e

    startPositionX.value = input.clientX
    startPositionY.value = input.clientY

    moveVelocityX.value = 0
    moveVelocityY.value = 0

    slider.value.style.transitionDuration = '' // reset smooth slide

    cancelAnimationFrame(animationFrame.value)
}

function moveEvent(e: any) {
    if (!isMove.value) {
        return
    }

    const input = isTouch.value ? e.touches[0] : e

    let movementX = (input.clientX - startPositionX.value) * moveSpeed.value
    let movementY = (input.clientY - startPositionY.value) * moveSpeed.value

    startPositionX.value = input.clientX
    startPositionY.value = input.clientY

    moveVelocityX.value = movementX
    moveVelocityY.value = movementY

    movePositionX.value += moveVelocityX.value
    movePositionY.value += moveVelocityY.value

    translateTo(movePositionX.value)
}

function stopEvent(e: any) {
    //document.body.style.overflow = null;
    isMove.value = false
    isTouch.value = false

    if (props.freeScroll) {
        // free scroll
        cancelAnimationFrame(animationFrame.value)
        animationFrame.value = requestAnimationFrame(freeLoop)
        return
    }

    let toPosition = -nextSlidePosition.value

    if (sliderOutDistance.value) {
        toPosition = movePositionX.value + sliderOutDistance.value
    }

    if (
        Math.abs(moveVelocityX.value) > minimumVelocityX.value &&
        !sliderOutDistance.value
    ) {
        // speed slide
        toPosition = -nextSlidePositionPermanent.value
        if (moveVelocityDirectionX.value > 0) {
            toPosition = -prevSlidePositionPermanent.value
        }
    }

    movePositionX.value = toPosition // set new postiton to slider
    translateTo(movePositionX.value, true)
    moveVelocityX.value = 0
}

/**
 * Move slide to x position
 */
function translateTo(positionX: number, useAnimateTime: boolean = false) {
    if (slider.value === null) return
    if (useAnimateTime) {
        slider.value.style.transitionDuration = `${slideChangeSpeed.value}ms` // set smooth slide back
        slider.value.style.transitionTimingFunction = 'ease-out'
    }

    slider.value.style.translate = `${positionX}px`
}

function freeLoop() {
    movePositionX.value += moveVelocityX.value
    moveVelocityX.value *= moveLoopStopCoefficient.value

    if (Math.abs(moveVelocityX.value) > 0.1) {
        translateTo(movePositionX.value)
        animationFrame.value = requestAnimationFrame(freeLoop)

        if (!sliderOutDistance.value) {
            return
        }
    }

    let toPosition = movePositionX.value + sliderOutDistance.value

    movePositionX.value = toPosition
    translateTo(movePositionX.value, true)
}
</script>
