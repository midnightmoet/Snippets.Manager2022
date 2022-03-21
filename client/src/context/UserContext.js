import React, { createContext, useState } from 'react';

const UserContext = createContext();

function UserContextProvider() {
    const [user, setUser] = useState(undefined);

    

   return null;
}

export {UserContextProvider};
