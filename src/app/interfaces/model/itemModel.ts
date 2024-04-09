export interface ImageModel {
    imageData: string
}

export interface ItemModel {
    id?: string
    title: string
    ImageModels: ImageModel[]
    imageUrls: string[]
    price: number
    description?: string
}