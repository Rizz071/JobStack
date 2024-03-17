import React, { useContext, useState } from "react";
import serviceLogin from "../../../services/serviceLogin";
// import AlertContext from "../Contexts/AlertContext";
// import Alert from "../Alert";
import UserContext from "../Contexts/UserContext";
import { Link } from "react-router-dom";

interface Props {
    demoLoginButtonRef: React.RefObject<HTMLButtonElement>;
}

const LoginForm = ({ demoLoginButtonRef }: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /* Access to global context AlertContext */
    // const { alerts, setAlerts } = useContext(AlertContext);

    /* Access to global context UserContext */
    const { setUser } = useContext(UserContext);

    const demoLogin = async () => {
        const loggedUser = await serviceLogin.requestUser({
            username: "admin",
            password: "11111",
        });

        setTimeout(() => {
            setUser(loggedUser);
        }, 0);
    };

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

            // setAlerts(alerts.concat("Login successfull"));

            setTimeout(() => {
                setUser(loggedUser);
            }, 3000);
        } else {
            // setAlerts(alerts.concat("Login failed"));
        }
    };

    return (
        <>
            {/* <div className="align-bottom">
                {alerts &&
                    alerts.map((alert, index) => (
                        <Alert key={index} message={alert} />
                    ))}
            </div> */}
            <div className="card border shadow-2xl">
                <form
                    className="card-body"
                    onSubmit={(event) => handleLogin(event)}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Login</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Login"
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
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <button
                            ref={demoLoginButtonRef}
                            type="button"
                            className="btn btn-outline btn-secondary btn-sm mt-4"
                            onClick={demoLogin}
                        >
                            Demo Login
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm mt-2"
                        >
                            <Link to="/registration" className="prose prose-sm">
                                New user registration
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
