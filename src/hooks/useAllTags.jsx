import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const useAllTags = () => {
    const { loader, user } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: tags, refetch } = useQuery({
        queryKey: ['tags'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/uniqueTags?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, tags, refetch }
};

export default useAllTags;