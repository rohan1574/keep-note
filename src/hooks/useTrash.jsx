import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { UserProvider } from '../context/AuthContext';

const useTrash = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: trash, refetch } = useQuery({
        queryKey: ['trash'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/trash?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, trash, refetch }
};

export default useTrash;