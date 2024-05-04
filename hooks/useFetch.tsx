import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Props = {
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    body?: any
}

export const useFetch = ({ url, method, body }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const config: AxiosRequestConfig = {
                method: method.toUpperCase(),
                url: url,
                data: body,
            };
            const response = await axios(config);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, method, body]);

    return {
        loading,
        data,
        error,
        fetchData // Return fetchData function
    };
};
