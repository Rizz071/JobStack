/* eslint-disable indent */
import React, { useState } from "react";
import { createContext } from "react";
import { LoggedUser, UsersType } from "../../types";

const UserContext = createContext<UsersType>({
    user: null,
    setUser: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const UserContextProvider = (props: Props) => {
    const [user, setUser] = useState<LoggedUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
