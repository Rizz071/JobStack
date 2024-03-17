import axios from "axios";
import { UserObject } from "../src/types";

const registerUser = async (user: UserObject): Promise<string> => {
    const response = await axios.post("/api/users", user);

    if (response.status === 409) return "User already exist!";
    if (response.status !== 201) return "Unknown error on server";

    return "User created";
};

export default { registerUser };
