import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { UserProvider } from '../context/AuthContext';

const useAllData = () => {
    const { user, loader } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data: notes, refetch } = useQuery({
        queryKey: ['repoData'],
        enabled: !loader,
        queryFn: () =>
            axiosData.get(`/notes?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, notes, refetch }
};

export default useAllData;