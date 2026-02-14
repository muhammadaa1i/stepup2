export interface Product {
    id: string
    name: string
    price: number
    sizes: string
    stockQuantity: number
}

export interface ProductResponse extends Product {
    image: string | null
    createdAt: string
    updatedAt: string
}

export interface CreateProductPayload extends Omit<Product, 'id'> {
    image?: File
}