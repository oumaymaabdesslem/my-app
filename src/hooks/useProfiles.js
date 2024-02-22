import { useState, useEffect } from 'react';

const useProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profiles`);
                const data = await response.json();
                setProfiles(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return { profiles, isLoading, error };
};

export default useProfiles;
