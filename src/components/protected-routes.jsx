/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoutes = ({children}) => {

    const {isSignedIn, user, isLoaded} = useUser();
    const {pathname} = useLocation();

    if (isLoaded && !isSignedIn && isSignedIn !== undefined){
        return <Navigate to="/?sign-in=true"/>
    }

    
    // Check Onboarding status
    if (
        user !== undefined && 
        !user?.unsafeMetadata?.role &&
        pathname !== "/onboarding") return <Navigate to="/onboarding" />;   



  return children;
};

export default ProtectedRoutes
