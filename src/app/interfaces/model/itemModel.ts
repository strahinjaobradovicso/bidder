export interface ImageModel {
    imageData: string
}

export interface ItemModel {
    id?: string
    title: string
    ImageModels: ImageModel[]
    price: number
    description?: string
}