import ButtonInterface from '@/Entity/ButtonInterface'
import ImageInterface from '@/Entity/ImageInterface'
import LangInterface from '@/Entity/LangInterface'
import LinkInterface from '@/Entity/LinkInterface'

type MenuItem = {
    title: string
    link: LinkInterface
}

export type HeaderState = {
    button_country: ButtonInterface
    button_login: ButtonInterface
    button_sign_up: ButtonInterface
    button_lang: ButtonInterface
    lang: {
        ar: LangInterface
        en: LangInterface
    }
    logo: ImageInterface
    menu: MenuItem[]
    menu_two: MenuItem[]
    country_list: Array<{
        title: string
        link: LinkInterface
        image: ImageInterface
    }>
}

export default interface StateInterface {
    data: HeaderState | null
    dataListIsLoading: boolean
}
