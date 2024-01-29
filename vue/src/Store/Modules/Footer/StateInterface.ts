import ImageInterface from '@/Entity/ImageInterface'
import LinkInterface from '@/Entity/LinkInterface'

import MenuInterface from '@/Widgets/Footer/Type/MenuInterface'

// type NinjaFormData = {
//     objectType: string
//     editActive: boolean
//     title: string
//     form_title: string
//     default_label_pos: string
//     show_title: string
//     clear_complete: string
//     hide_complete: string
//     logged_in: string
//     wrapper_class: string
//     element_class: string
//     key: string
//     add_submit: string
//     currency: string
//     unique_field_error: string
//     not_logged_in_msg: string
//     sub_limit_msg: string
//     calculations: any[]
//     formContentData: string[]
//     drawerDisabled: boolean
//     allow_public_link: number
//     embed_form: string
//     form_title_heading_level: string
//     changeEmailErrorMsg: string
//     changeDateErrorMsg: string
//     confirmFieldErrorMsg: string
//     fieldNumberNumMinError: string
//     fieldNumberNumMaxError: string
//     fieldNumberIncrementBy: string
//     formErrorsCorrectErrors: string
//     validateRequiredField: string
//     honeypotHoneypotError: string
//     fieldsMarkedRequired: string
// }

export type FooterData = {
    footer: {
        logo: ImageInterface
        menu: Array<MenuInterface>
        info: string
        social: Array<{ image: ImageInterface; link: LinkInterface }>
    }
    contact_us: {
        title: string
        input_title: string
        phone: string
        // ninja_form: {
        //     id: string
        //     date_updated: string | null
        //     data: NinjaFormData
        // }
        // ninja_form_html: string
    }
}

export default interface StateInterface {
    data: FooterData | null
    dataListIsLoading: boolean
}
