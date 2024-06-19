import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setData(false)
            try {
                const res = await fetch(url, { cache: 'no-store' })
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                const json = await res.json();
                setIsLoading(false)
                setData(json)
            } catch (error) {
                setError(`${error} Could not fetch data`);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);
    return { data, isLoading, error }
}