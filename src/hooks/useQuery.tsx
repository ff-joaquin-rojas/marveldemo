import { useEffect, useState } from 'react'
import { PaginationParams } from '../services/MarvelApi';
import { MarvelAPIResponse } from '../services/models/responses';

export interface QueryOptions {
    skip?: boolean
}

export const DEFAULT_LIMIT = 20;
export const INITIAL_OFFSET = 0;

const useQuery = <T,>(query: (params?: PaginationParams) => Promise<MarvelAPIResponse<T>>, params?: PaginationParams, options?: QueryOptions) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<MarvelAPIResponse<T> | undefined>()
    const [error, setError] = useState<any>(undefined)
    const [limit, setLimit] = useState(DEFAULT_LIMIT)
    const [offset, setOffset] = useState(INITIAL_OFFSET)

    const runApiCall = async () => {
        setLoading(true)
        try {
            const response = await query();
            setData(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMore = async () => {
        setLoading(true)
        try {
            const newOffset = offset + limit
            const response = await query({ params: { limit, offset: newOffset } });
            const oldResults = data?.data.results || []
            setData({ ...response, data: { ...response.data, results: [...oldResults, ...response.data.results] } })
            setLimit(limit)
            setOffset(newOffset)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const refetch = async () => {
        try {
            setLimit(DEFAULT_LIMIT)
            setOffset(INITIAL_OFFSET)
            const response = await query({ params: { limit: DEFAULT_LIMIT, offset: INITIAL_OFFSET } });
            setData(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!options?.skip) {
            runApiCall()
        } else {
            setLoading(false)
        }
    }, [options?.skip, params])

    return { loading, data, error, fetchMore, refetch }
}

export default useQuery