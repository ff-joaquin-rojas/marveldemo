import { useEffect, useState } from 'react'
import { PaginationParams } from '../services/MarvelApi';

export interface QueryOptions {
    skip?: boolean
}

export interface Params extends PaginationParams {
    [key: string]: any;
}

export const DEFAULT_LIMIT = 20;
export const INITIAL_OFFSET = 0;

type Parameter<T> = T extends (arg: infer T) => any ? T : never;

const useQuery = <F extends (params: any) => any>(query: F, params?: Parameter<F>) => {
    const key = params?.key ?? `${query.name}${params ? `:${Object.keys(params).join(':')}` : ''}`

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Awaited<ReturnType<F>> | undefined>()
    const [error, setError] = useState<any>(undefined)
    const [limit, setLimit] = useState(DEFAULT_LIMIT)
    const [offset, setOffset] = useState(INITIAL_OFFSET)

    const runApiCall = async () => {
        setLoading(true)
        try {
            const response: Awaited<ReturnType<F>> = await query(params);
            setData(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMore = async () => {
        if (data) {
            setLoading(true)
            try {
                const newOffset = offset + limit
                const response: Awaited<ReturnType<F>> = await query({ params: { limit, offset: newOffset } });
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
        runApiCall()
    }, [key])

    return { loading, data, error, fetchMore, refetch }
}

export default useQuery