export interface MarvelAPIResponse<T> {
    code: number,
    status: string,
    copyright: string,
    attributionText: string,
    attributionHTML: string,
    data: {
        offset: number,
        limit: number,
        total: number,
        count: number,
        results: T[]
    },
    etag: string
}

export interface MarvelAPIError {
    code: string,
    message: string,
}