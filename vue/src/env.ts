declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development'

            VUE_APP_WORDPRESS_PAGE_ID_HOME: string
            VUE_APP_WORDPRESS_PAGE_ID_ABOUT: string
            VUE_APP_WORDPRESS_PAGE_ID_INVOICE: string
            VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT: string
            VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP: string
            VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS: string
            VUE_APP_WORDPRESS_PAGE_ID_NEWS: string
            VUE_APP_WORDPRESS_PAGE_ID_SUPPORT: string
            VUE_APP_WORDPRESS_PAGE_ID_PRICING: string
            //
            VUE_APP_WORDPRESS_PAGE_ID_HOME_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_ABOUT_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_INVOICE_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_NEWS_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_SUPPORT_AR: string
            VUE_APP_WORDPRESS_PAGE_ID_PRICING_AR: string
        }
    }
}

export const isDevelopment = process.env.NODE_ENV === 'development'

export const VUE_APP_WORDPRESS_PAGE_ID_HOME =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_HOME
export const VUE_APP_WORDPRESS_PAGE_ID_ABOUT =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_ABOUT
export const VUE_APP_WORDPRESS_PAGE_ID_INVOICE =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_INVOICE
export const VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT
export const VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP
export const VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS
export const VUE_APP_WORDPRESS_PAGE_ID_NEWS =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_NEWS
export const VUE_APP_WORDPRESS_PAGE_ID_SUPPORT =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_SUPPORT
export const VUE_APP_WORDPRESS_PAGE_ID_PRICING =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_PRICING

export const VUE_APP_WORDPRESS_PAGE_ID_HOME_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_HOME_AR
export const VUE_APP_WORDPRESS_PAGE_ID_ABOUT_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_ABOUT_AR
export const VUE_APP_WORDPRESS_PAGE_ID_INVOICE_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_INVOICE_AR
export const VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT_AR
export const VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP_AR
export const VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS_AR
export const VUE_APP_WORDPRESS_PAGE_ID_NEWS_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_NEWS_AR
export const VUE_APP_WORDPRESS_PAGE_ID_SUPPORT_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_SUPPORT_AR
export const VUE_APP_WORDPRESS_PAGE_ID_PRICING_AR =
    process.env.VUE_APP_WORDPRESS_PAGE_ID_PRICING_AR
