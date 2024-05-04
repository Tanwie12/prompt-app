import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';

export const useFetch = (url, method, body) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); // Change to null to distinguish between loading and error

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const config = {
                    method: method.toUpperCase(), // Ensure method is uppercase
                    url: url,
                    data: body, // Pass body if provided
                };
                const response = await axios(config);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setData(response.data);
                setError(null); // Reset error state
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {
        loading,
        data,
        error,
        fetchData
    };
};
