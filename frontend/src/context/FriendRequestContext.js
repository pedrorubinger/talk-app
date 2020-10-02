import React, { createContext, useContext, useState } from 'react';

const FriendRequestContext = createContext();

export default function FriendRequestProvider({ children }) {
    const [recipientRequestId, setRecipientRequestId] = useState(-1);

    return( 
        <FriendRequestContext.Provider
            value={{
                recipientRequestId,
                setRecipientRequestId
            }}
        >
            { children }
        </FriendRequestContext.Provider>
    );
}

export function useFriendRequestContext() {
    const context = useContext(FriendRequestContext);

    if(!context)
        throw new Error("useUserContext must be used within a FriendRequestProvider");

    const { recipientRequestId, setRecipientRequestId } = context;
    return { recipientRequestId, setRecipientRequestId };
}