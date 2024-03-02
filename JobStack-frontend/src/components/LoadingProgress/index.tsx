import React from "react";

const LoadingProgress = () => {
    return (
        <div className="prose mx-auto my-auto flex h-full w-full flex-col items-center justify-center align-middle">
            <p className="">Loading in progress</p>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    );
};

export default LoadingProgress;
