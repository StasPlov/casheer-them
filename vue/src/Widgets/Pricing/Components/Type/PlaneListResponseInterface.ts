import PostInterface from '@/Entity/PostInterface'

import PlanInterface from '@/Widgets/Pricing/Components/Plan/Type/PlanInterface'

export default interface PlaneListResponseInterface {
    data: PlanInterface
    link: string
    post: PostInterface
}
