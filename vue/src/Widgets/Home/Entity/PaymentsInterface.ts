import ButtonInterface from '@/Entity/ButtonInterface'
import ImageInterface from '@/Entity/ImageInterface'

export default interface PaymentsInterface {
    title: string
    description: string
    color: string
    image: ImageInterface
    background: ImageInterface
    button: ButtonInterface
}
