import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';
import { AuthContext } from '../AuthContext/AuthContext';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userData = onAuthStateChanged(auth, (currentUser) => {
            // console.log("User is: ", userData);
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            userData();
        }

    }, [])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSign = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const info = {
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        googleSign
    }
    return (
        <div>
            <AuthContext value={info}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;