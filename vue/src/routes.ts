import {
    VUE_APP_WORDPRESS_PAGE_ID_ABOUT,
    VUE_APP_WORDPRESS_PAGE_ID_ABOUT_AR,
    VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT,
    VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT_AR,
    VUE_APP_WORDPRESS_PAGE_ID_HOME,
    VUE_APP_WORDPRESS_PAGE_ID_HOME_AR,
    VUE_APP_WORDPRESS_PAGE_ID_INVOICE,
    VUE_APP_WORDPRESS_PAGE_ID_INVOICE_AR,
    VUE_APP_WORDPRESS_PAGE_ID_NEWS,
    VUE_APP_WORDPRESS_PAGE_ID_NEWS_AR,
    VUE_APP_WORDPRESS_PAGE_ID_PRICING,
    VUE_APP_WORDPRESS_PAGE_ID_PRICING_AR,
    VUE_APP_WORDPRESS_PAGE_ID_SUPPORT,
    VUE_APP_WORDPRESS_PAGE_ID_SUPPORT_AR,
    VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP,
    VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP_AR,
    VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS,
    VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS_AR,
} from '@/env'

import About from '@/Pages/About.vue'
import Checkout from '@/Pages/Checkout.vue'
import Home from '@/Pages/Home.vue'
import Invoice from '@/Pages/Invoice.vue'
import News from '@/Pages/News.vue'
import NewsPost from '@/Pages/NewsPost.vue'
import NotFound from '@/Pages/NotFound.vue'
import Pricing from '@/Pages/Pricing.vue'
import Support from '@/Pages/Support.vue'
import TouchTap from '@/Pages/TouchTap.vue'
import WalletCards from '@/Pages/WalletCards.vue'

export const routesTemplate = {
    'index.php': Home,
    'template-about.php': About,
    'template-invoice.php': Invoice,
    'template-checkout.php': Checkout,
    'template-touch-and-tap.php': TouchTap,
    'template-wallet-and-cards.php': WalletCards,
    'template-news.php': News,
    'template-support.php': Support,
    'template-pricing.php': Pricing,
}

type Route = {
    template: typeof import('*.vue').default
    id?: string
    path: string
    name: string
}

const home: Route = {
    template: Home,
    id: VUE_APP_WORDPRESS_PAGE_ID_HOME,
    path: '/',
    name: 'home',
}

const about: Route = {
    template: About,
    id: VUE_APP_WORDPRESS_PAGE_ID_ABOUT,
    path: '/about-us',
    name: 'about-us',
}

const invoice: Route = {
    template: Invoice,
    id: VUE_APP_WORDPRESS_PAGE_ID_INVOICE,
    path: '/invoice',
    name: 'invoice',
}

const checkout: Route = {
    template: Checkout,
    id: VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT,
    path: '/checkout',
    name: 'checkout',
}

const tap: Route = {
    template: TouchTap,
    id: VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP,
    path: '/touch-and-tap',
    name: 'touch-and-tap',
}

const cards: Route = {
    template: WalletCards,
    id: VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS,
    path: '/wallet-and-cards',
    name: 'wallet-and-cards',
}

const news: Route = {
    template: News,
    id: VUE_APP_WORDPRESS_PAGE_ID_NEWS,
    path: '/news',
    name: 'news',
}

const newsPost: Route = {
    template: NewsPost,
    path: '/news-post/',
    name: 'news-post',
}

const support: Route = {
    template: Support,
    id: VUE_APP_WORDPRESS_PAGE_ID_SUPPORT,
    path: '/support',
    name: 'support',
}

const pricing: Route = {
    template: Pricing,
    id: VUE_APP_WORDPRESS_PAGE_ID_PRICING,
    path: '/pricing',
    name: 'pricing',
}

const notFound: Route = {
    template: NotFound,
    path: '/not-found',
    name: 'not-found',
}

// ar

const homeAR: Route = {
    template: Home,
    id: VUE_APP_WORDPRESS_PAGE_ID_HOME_AR,
    path: '/ar/home-ar',
    name: 'home-ar',
}

const aboutAR: Route = {
    template: About,
    id: VUE_APP_WORDPRESS_PAGE_ID_ABOUT_AR,
    path: '/ar/about-us-2',
    name: 'about-us-2',
}

const invoiceAR: Route = {
    template: Invoice,
    id: VUE_APP_WORDPRESS_PAGE_ID_INVOICE_AR,
    path: '/ar/invoice-ar',
    name: 'invoice-ar',
}

const checkoutAR: Route = {
    template: Checkout,
    id: VUE_APP_WORDPRESS_PAGE_ID_CHECKOUT_AR,
    path: '/ar/checkout-ar',
    name: 'checkout-ar',
}

const tapAR: Route = {
    template: TouchTap,
    id: VUE_APP_WORDPRESS_PAGE_ID_TOUCH_TAP_AR,
    path: '/ar/touch-and-tap-ar',
    name: 'touch-and-tap-ar',
}

const cardsAR: Route = {
    template: WalletCards,
    id: VUE_APP_WORDPRESS_PAGE_ID_WALLET_CARDS_AR,
    path: '/ar/wallet-and-carts-ar',
    name: 'wallet-and-carts-ar',
}

const newsAR: Route = {
    template: News,
    id: VUE_APP_WORDPRESS_PAGE_ID_NEWS_AR,
    path: '/ar/news-ar',
    name: 'news-ar',
}

const supportAR: Route = {
    template: Support,
    id: VUE_APP_WORDPRESS_PAGE_ID_SUPPORT_AR,
    path: '/ar/support-ar',
    name: 'support-ar',
}

const pricingAR: Route = {
    template: Pricing,
    id: VUE_APP_WORDPRESS_PAGE_ID_PRICING_AR,
    path: '/ar/pricing-ar',
    name: 'pricing-ar',
}

export const namedRoutes = {
    home,
    about,
    invoice,
    checkout,
    tap,
    cards,
    news,
    newsPost,
    support,
    pricing,
    notFound,
    homeAR,
    aboutAR,
    invoiceAR,
    checkoutAR,
    tapAR,
    cardsAR,
    newsAR,
    supportAR,
    pricingAR,
}

export const routesList: Route[] = [
    home,
    about,
    invoice,
    checkout,
    tap,
    cards,
    news,
    newsPost,
    support,
    pricing,
    notFound,
    homeAR,
    aboutAR,
    invoiceAR,
    checkoutAR,
    tapAR,
    cardsAR,
    newsAR,
    supportAR,
    pricingAR,
]
