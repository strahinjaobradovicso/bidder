export interface ImageModel {
    imageData: string
}

export interface ItemModel {
    id: number
    title: string
    ImageModels: ImageModel[]
    price: number
    description?: string
}