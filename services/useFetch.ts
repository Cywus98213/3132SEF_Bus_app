import { useEffect, useState } from "react"

const useFetch = <T extends { data: any }>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState(<T | null>(null));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(<Error | null>(null));


    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result.data)
        } catch (err){
            //@ts-ignore
            setError(error instanceof Error ? err : new Error('An error occurred'))
        } finally {
            setLoading(false)
        }

    }

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return {data, loading, error, refetch: fetchData, reset}
}


export default useFetch;