export interface ActionResponse<T = unknown> {
    success: boolean
    message: string
    errors?: {
        [K in keyof T]?: string[]
    }
    inputs?: T
}