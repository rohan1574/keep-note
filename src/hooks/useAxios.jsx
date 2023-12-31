import axios from 'axios';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const instance = axios.create({
    baseURL: 'https://seequenzetechnologies.vercel.app',
});

const useAxios = () => {
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('Token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            signOut(auth)
        }
        return Promise.reject(error);
    });

    return instance;
};

export default useAxios;