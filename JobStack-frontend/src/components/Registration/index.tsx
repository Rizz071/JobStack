import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import serviceRegistration from "../../../services/serviceRegistration";

const Registration = () => {
    const [fullname, setFullname] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");
    const [successInfo, setSuccessInfo] = useState<string>("");
    // const [loginError, setLoginError] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password1 !== password2) {
            setPasswordError(true);
            setErrorInfo("Passwords must be equal!");
            return;
        } else {
            setErrorInfo("");
            setPasswordError(false);
        }

        const response = await serviceRegistration.registerUser({
            fullname: fullname ? fullname : "",
            username: login,
            password: password1,
        });

        if (response !== "User created") {
            setErrorInfo(response);
            return;
        }

        setSuccessInfo("User created! You may now login.");

        setTimeout(() => {
            navigate("/");
        });
    };

    return (
        <div className="card mx-auto flex w-full max-w-sm shrink-0 flex-col bg-base-100 shadow-2xl">
            <form className="card-body gap-y-4" onSubmit={handleSubmit}>
                <h1 className="card-title">Registration</h1>

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="input-ghost grow border-none"
                        placeholder="Full name (Optional)"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="input-ghost grow border-none "
                        placeholder="Username"
                        required
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                    />
                </label>
                <label
                    className={`${
                        passwordError && "input-error"
                    } input input-bordered flex items-center gap-2`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        className="input-ghost grow border-none "
                        placeholder="Password"
                        required
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                    />
                </label>
                <label
                    className={`${
                        passwordError && "input-error"
                    } input input-bordered flex items-center gap-2`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        className="input-ghost input-secondary  grow border-none"
                        placeholder="Password again"
                        required
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                    />
                </label>
                <div className="flex justify-between">
                    <button type="submit" className="btn btn-primary btn-md">
                        Register
                    </button>
                    <button
                        type="button"
                        className="btn btn-neutral btn-md"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
                <p
                    className={`${
                        !errorInfo ? "hidden" : "block"
                    } mx-auto text-error`}
                >
                    {errorInfo}
                </p>
                <p
                    className={`${
                        !successInfo ? "hidden" : "block"
                    } mx-auto text-success`}
                >
                    {successInfo}
                </p>
            </form>
        </div>
    );
};

export default Registration;
