import axios from "axios";
import { LoggedUser, LoggingUser } from "../src/types";

/* Typeguard for string type */
const isString = (object: unknown): object is string => {
    return typeof object === "string" || object instanceof String;
};

/* Type narrowing for LoggedUser type */
const isLoggedUser = (object: unknown): object is LoggedUser => {
    if (
        !object ||
        typeof object !== "object" ||
        !("username" in object) ||
        !("token" in object) ||
        !("fullname" in object) ||
        !isString(object.username) ||
        !isString(object.token) ||
        !isString(object.fullname) ||
        !object.username ||
        !object.token
    ) {
        return false;
    }

    return true;
};

/* Function for authentication by username and password */
const requestUser = async ({
    username,
    password,
}: LoggingUser): Promise<LoggedUser | null> => {
    try {
        /* Sending username and password to server and waiting for response.
         * If username and password will be allright, server will send object
         * with username, fullname and token included */
        const response: unknown = await axios.post("/api/login", {
            username,
            password,
        });

        /* Type narrowing for received object */
        if (
            !response ||
            typeof response !== "object" ||
            !("data" in response)
        ) {
            throw new Error("Error in structure of answer from server");
        }

        /* Type narrowing for received object */
        const receivedUser: LoggedUser | null = isLoggedUser(response.data)
            ? response.data
            : null;

        /* Saving user to local storage */
        window.localStorage.setItem("loggedUser", JSON.stringify(receivedUser));

        /* Returning LoggedUser object or null if user wasn't founded */
        return receivedUser;
    } catch (error) {
        if (error instanceof Error)
            throw new Error("Error while requesting auth token", error);
    }
    return null;
};

const logoutUser = (
    setUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>
) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
};

export default { requestUser, logoutUser };
