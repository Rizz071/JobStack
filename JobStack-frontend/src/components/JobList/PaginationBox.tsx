import React from "react";
interface Props {
    pagesTotalAmount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationBox = ({
    pagesTotalAmount,
    currentPage,
    setCurrentPage,
}: Props) => {
    const pagArray: React.ReactElement[] = [];

    const handleClick = (newCurrentPage: number) => {
        setCurrentPage(newCurrentPage);
    };

    for (let i: number = 0; i < pagesTotalAmount; i++) {
        pagArray.push(
            <button
                onClick={() => handleClick(i)}
                key={i}
                className={`btn join-item border-neutral ${currentPage === i ? "btn-neutral" : ""
                    // eslint-disable-next-line indent
                    } btn-sm`}
            >
                {i + 1}
            </button>
        );
    }

    if(pagesTotalAmount === 1) return null;

    return (
        <div className="flex justify-between">
            <div>
                {/* <button className="btn btn-sm  text-xs">
          Total {pagesTotalAmount} entries
        </button> */}
            </div>
            <div className="join shadow-xl">{pagArray}</div>
        </div>
    );
};

export default PaginationBox;
