declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<
        NonNullable<unknown>,
        NonNullable<unknown>,
        any
    >
    export default component
}

declare module '*.svg' {
    export default string
}

declare module '*.png' {
    export default string
}

declare module '*.jpg' {
    export default string
}

declare module '*.jpeg' {
    export default string
}
