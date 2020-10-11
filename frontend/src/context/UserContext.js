import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [userId, setUserId] = useState(-1);
    const [userProfileData, setUserProfileData] = useState({});
    const [accountEditing, setAccountEditing] = useState(false);
    const [contactsList, setContactsList] = useState([]);

    return(
        <UserContext.Provider
            value={{
                userId,
                userProfileData,
                accountEditing,
                contactsList,
                setUserId,
                setUserProfileData,
                setAccountEditing,
                setContactsList
            }}
        >
            { children }
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);

    if(!context)
        throw new Error("useUserContext must be used within a UserProvider");

    const {
        userId,
        setUserId,
        userProfileData,
        setUserProfileData,
        accountEditing,
        setAccountEditing,
        contactsList,
        setContactsList
    } = context;
    
    return {
        userId,
        setUserId,
        userProfileData,
        setUserProfileData,
        accountEditing,
        setAccountEditing,
        contactsList,
        setContactsList
    };
}