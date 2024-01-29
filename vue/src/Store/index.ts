import { Store } from 'vuex'

import filter from '@/Store/Modules/Filter/index'
import FilterInterface from '@/Store/Modules/Filter/StateInterface'
import footer from '@/Store/Modules/Footer/index'
import FooterInterface from '@/Store/Modules/Footer/StateInterface'
import header from '@/Store/Modules/Header/index'
import HeaderInterface from '@/Store/Modules/Header/StateInterface'
import pageData from '@/Store/Modules/PageData/index'
import PageDataInterface from '@/Store/Modules/PageData/StateInterface'
import pageInfo from '@/Store/Modules/PageInfo/index'
import PageInfoInterface from '@/Store/Modules/PageInfo/StateInterface'
import plane from '@/Store/Modules/Plane/index'
import PlaneInterface from '@/Store/Modules/Plane/StateInterface'
import post from '@/Store/Modules/Post/index'
import PostInterface from '@/Store/Modules/Post/StateInterface'
import support from '@/Store/Modules/Support/index'
import SupportInterface from '@/Store/Modules/Support/StateInterface'

export interface RootStateInterface {
    pageInfo: PageInfoInterface
    pageData: PageDataInterface
    post: PostInterface
    header: HeaderInterface
    plane: PlaneInterface
    filter: FilterInterface
    footer: FooterInterface
    support: SupportInterface
}

export default new Store<RootStateInterface>({
    modules: {
        pageInfo,
        pageData,
        post,
        header,
        plane,
        filter,
        footer,
        support,
    },
})
