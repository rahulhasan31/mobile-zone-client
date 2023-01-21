import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

const auth=getAuth(app)
export const AuthContext=createContext()
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null)
    const [loading , setLoading]=useState(true)

    const createUser=(email, password)=>{
    setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser=(email, password)=>{
       setLoading(true)
       return signInWithEmailAndPassword(auth, email,password)
    }

    const logOutUser=()=>{
       setLoading(true)
     return  signOut(auth)
       .then(r=>console.log(r))
       .catch(e=>console.log(e))
    }

    const updateUser=(profile)=>{
       setLoading(true)
     return  updateProfile(auth.currentUser, profile )
       .then(()=>{})
       .catch(e=>console.log(e))
    }
    
    const googleLogin=()=>{
        return signInWithPopup(auth, provider)
    }
    


useEffect(()=>{
 const unsubscribe = onAuthStateChanged(auth, currentUser=>{
       setUser(currentUser)
       setLoading(false)
   })
   return ()=> unsubscribe()
},[])


    const authInfo={user,loading, createUser, loginUser, logOutUser, updateUser, googleLogin}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;