import { fetchClient } from '@/utils/helper/fetchClient';
import { MessageTemplate } from '@/utils/types';
import { CustomerService, User } from 'next-auth';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useTemplate = (user: User | CustomerService | undefined) => {

    const [templateList, settemplateList] = useState<MessageTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        const response = await fetchClient({
            url: '/templates',
            method: 'GET',
            user: user
        });
        if (response?.ok) {
            const result = await response.json();
            console.log(result)
            settemplateList(result);
        } else {
            toast.error('Tidak bisa fetch Template')
        }
        setLoading(false);
    };
    useEffect(() => {
        if (user?.token) {
            fetchData();
        }

    }, [user?.token]);

    return { templateList, loading };
};

export default useTemplate;