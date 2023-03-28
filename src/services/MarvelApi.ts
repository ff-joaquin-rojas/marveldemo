import { stringMd5 } from "react-native-quick-md5"
import { MarvelAPIError, MarvelAPIResponse } from "./models/responses"
import { REACT_APP_API_URL, REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY } from "@env"
import { Character } from "../models/Character"

const marvelApiUrl = REACT_APP_API_URL
const publicApiKey = REACT_APP_PUBLIC_API_KEY
const privateApiKey = REACT_APP_PRIVATE_API_KEY

export interface PaginationParams {
    params?: {
        offset: number,
        limit: number,
    }
}

export interface GetCharacterParams extends PaginationParams {
    id: number
}

const getHashForAuthentication = () => {
    const timeStamp = Date.now()

    const hash = stringMd5(`${timeStamp}${privateApiKey}${publicApiKey}`)
    const apiKeyParam = `?ts=${timeStamp}&apikey=${publicApiKey}&hash=${hash}`
    return apiKeyParam;
}

const getParameters = (paramsObject?: PaginationParams) => {
    if (!paramsObject) return ''
    const { params } = paramsObject
    if (params?.offset && params?.limit) {
        return `&limit=${params.limit}&offset=${params.offset}`
    }
    return ''
}


export const getCharacters = async (params?: PaginationParams) => {
    const parameters = getParameters(params)
    const authParams = getHashForAuthentication()
    const url = `${marvelApiUrl}/v1/public/characters${authParams}${parameters}`
    const response = await fetch(url)
    const json = await response.json() as MarvelAPIError
    if (json.code === 'RequestThrottled') {
        throw new Error(json.message)
    }
    return await response.json() as MarvelAPIResponse<Character>
}

export const getCharacterDetails = async ({ id, ...paginationParams }: GetCharacterParams) => {
    const parameters = getParameters({ ...paginationParams })
    const authParams = getHashForAuthentication()
    const url = `${marvelApiUrl}/v1/public/characters/${id}${authParams}${parameters}`
    const response = await fetch(url)
    const json = await response.json() as MarvelAPIError
    if (json.code === 'RequestThrottled') {
        throw new Error(json.message)
    }
    return await response.json() as MarvelAPIResponse<Character>
} 