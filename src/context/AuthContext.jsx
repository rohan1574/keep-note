import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/firebase.config';
import useAxios from '../hooks/useAxios';
export const UserProvider = createContext(null)

const AuthContext = ({ children }) => {
    const axiosData = useAxios();
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)
    const [userPhoto, setUserPhoto] = useState('')
    const provider = new GoogleAuthProvider();

    const [trash, setTrash] = useState(0)


    const googleSignIn = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                const userEmail = { email: user.email };
                axiosData.post('/jwt', userEmail)
                    .then((res) => {
                        if (res.data.token) {
                            localStorage.setItem('Token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('Token')
            }
            setLoader(false)
        });
        return () => {
            return unSubscribe()
        }
    }, [])



    const sendValue = {
        createUser,
        signIn,
        logOut,
        googleSignIn,

        // 
        user,
        loader,
        setUserPhoto,
        userPhoto,
        trash,
        setTrash


    }
    return (
        <UserProvider.Provider value={sendValue}>
            {children}
        </UserProvider.Provider>
    );
};

export default AuthContext;