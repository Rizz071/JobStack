import React, { useContext, useState } from "react";
import serviceLogin from "../../../services/serviceLogin";
import AlertContext from "../Contexts/AlertContext";
import { AlertsType } from "../../types";
import Alert from "../Alert";
import UserContext from "../Contexts/UserContext";

// interface Props {
//     // user: LoggedUser | null;
//     setUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
// }

const Hero = () => {
    const [username, setUsername] = useState<string>("admin");
    const [password, setPassword] = useState<string>("11111");

    /* Access to global context AlertContext */
    const alertsContext = useContext(AlertContext);
    const { alerts, setAlerts } = useContext(AlertContext) as AlertsType;

    /* Access to global context UserContext */
    const { setUser } = useContext(UserContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loggedUser = await serviceLogin.requestUser({
            username,
            password,
        });

        if (loggedUser) {
            window.localStorage.setItem(
                "loggedUser",
                JSON.stringify(loggedUser)
            );

            setUsername("");
            setPassword("");

            setUser(loggedUser);

            // setAlerts(alerts.concat("Login successfull"));
        } else {
            setAlerts(alerts.concat("Login failed"));
        }
    };

    return (
        <>
            <div className="ml-auto align-bottom">
                {alertsContext &&
                    alertsContext.alerts.map((alert, index) => (
                        <Alert key={index} message={alert} />
                    ))}
            </div>
            <div className="hero my-auto bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
                        <form
                            className="card-body"
                            onSubmit={(event) => handleLogin(event)}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    // required
                                />
                                <label className="label">
                                    <a
                                        href="#"
                                        className="link-hover link label-text-alt"
                                    >
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
