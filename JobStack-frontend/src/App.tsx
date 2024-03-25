import React, { useContext, useEffect } from "react";
import DetailJobView from "./components/DetailJobView";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";
import { LoggedUser } from "./types";
import UserContext from "./components/Contexts/UserContext";
import Registration from "./components/Registration";

function App() {
    /* Access to global context UserContext */
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const loggedUser: string | null =
            window.localStorage.getItem("loggedUser");

        if (loggedUser) {
            const user: LoggedUser = JSON.parse(loggedUser);
            setUser(user);
            // noteService.setToken(user.token);
        }
    }, [setUser]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={!user ? <Hero /> : <Navigate to="/dashboard" />}
                />
                <Route element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="registration" element={<Registration />} />
                    <Route
                        path="dashboard/detailview/:id"
                        element={
                            <div className="flex w-full flex-row justify-center gap-x-6">
                                <DetailJobView />
                            </div>
                        }
                    />
                </Route>
                <Route path="*" element={<p>404 page not found</p>} />
            </Routes>
        </>
    );
}

export default App;
