import React, { useRef } from "react";
import LoginForm from "./LoginForm";

import imgHipster from "../../assets/images/Hipster4.jpeg";
import imgCategorization from "../../assets/images/Categorization.jpeg";
import imgEvent from "../../assets/images/Event.jpeg";
import imgFreeSoftware from "../../assets/images/FreeSoftware1.jpeg";
import imgSearch from "../../assets/images/Search1.jpeg";
import imgDuplicates from "../../assets/images/Duplicates.jpeg";
import imgBackup from "../../assets/images/Backup2.jpeg";

const Hero = () => {
    const demoLoginButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <div id="background" className="border bg-base-200 ">
            <div
                id="wrapper"
                className="xl:4/5 mx-auto flex w-full flex-col justify-between gap-5 rounded-xl bg-base-100 p-10 shadow-2xl sm:mt-10 lg:w-4/5 lg:p-20 2xl:w-3/5"
            >
                <div
                    id="first-block"
                    className="mx-auto flex flex-col justify-between gap-10 lg:mx-0 lg:flex-row"
                >
                    <article className="prose prose-sm flex flex-col flex-wrap md:prose-base">
                        <h1 className="text-center lg:text-left">
                            Welcome to our job application management platform!
                        </h1>
                        <div className="mx-auto flex flex-col justify-between gap-5 md:flex-row">
                            <figure className="flex flex-col lg:hidden xl:block">
                                <img
                                    src={imgHipster}
                                    alt="Hipster standing"
                                    className="rounded"
                                />
                            </figure>
                            <p className="font-base text-justify">
                                Are you tired of sifting through endless job
                                applications and losing track of important
                                details?
                                <br />
                                <br />
                                <strong>We are here to save the day!</strong>
                                <br />
                                Our web application gives you peace of mind
                                knowing that your job search is organized and
                                under control. You can be sure that you will not
                                miss a single opportunity.
                            </p>
                        </div>
                    </article>

                    <div className="mx-auto w-full md:w-72 lg:mx-0">
                        <LoginForm demoLoginButtonRef={demoLoginButtonRef} />
                    </div>
                </div>

                <div
                    id="cards-wrapper"
                    className="flex flex-col justify-between gap-10"
                >
                    <div className="prose mx-auto lg:mx-0">
                        <h1>Key features</h1>
                    </div>
                    <div
                        id="cards-wrapper-line-1"
                        className="mx-auto flex flex-col justify-between gap-10 lg:mx-0 lg:flex-row"
                    >
                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={imgCategorization}
                                    alt="Categorization"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    Easy Categorization
                                </h2>
                                <p>
                                    Organize job postings into customizable
                                    categories for efficient management.
                                </p>
                            </div>
                        </div>

                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img src={imgEvent} alt="Event tracking" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Event Tracking</h2>
                                <p>
                                    Stay updated with real-time notifications on
                                    application responses and other important
                                    events.
                                </p>
                            </div>
                        </div>

                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={imgFreeSoftware}
                                    alt="Free Software"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Free Software</h2>
                                <p>
                                    This software is absolutely free and is
                                    provided to the user with a GPL license.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        id="cards-wrapper-line-2"
                        className="mx-auto flex flex-col justify-between gap-10 lg:mx-0 lg:flex-row"
                    >
                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img src={imgSearch} alt="Search" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Efficient Search</h2>
                                <p>
                                    Find the perfect candidate with our fast and
                                    intuitive search functionality.
                                </p>
                            </div>
                        </div>

                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    src={imgDuplicates}
                                    alt="Duplicates detection"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    Duplicate Detection
                                </h2>
                                <p>
                                    Avoid confusion by identifying and managing
                                    duplicate applications effortlessly.
                                </p>
                            </div>
                        </div>

                        <div className="card w-72 border bg-base-100 shadow-xl">
                            <figure>
                                <img src={imgBackup} alt="Backup" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Data Backup</h2>
                                <p>
                                    Never worry about losing important
                                    information. Our app allows you to securely
                                    back up your data for peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    id="footer-wrapper"
                    className="prose prose-xl mx-auto flex flex-col"
                >
                    <p className="font-base text-center">
                        Take control of your hiring process and streamline your
                        workflow with our powerful job application management
                        tool.
                        <br />
                        <strong>
                            Sign up today and experience the difference!
                        </strong>
                    </p>
                    <button
                        className="btn btn-success mx-auto w-1/2"
                        onClick={() =>
                            demoLoginButtonRef.current &&
                            demoLoginButtonRef.current.click()
                        }
                    >
                        Demo Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
