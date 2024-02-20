import React from "react";

const LoadingProgress = () => {
    return (
        <div className="prose w-full justify-center flex-col items-center flex h-full mx-auto">
            <p className="">Loading in progress</p>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    );
};


export default LoadingProgress;

