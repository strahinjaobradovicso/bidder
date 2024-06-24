import { ImageModel } from "./image.interface"

export interface ItemModel {
    id: number
    title: string
    ImageModels: ImageModel[]
    price: number
    description?: string
}