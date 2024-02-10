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
        className={`btn join-item rounded-md ${
          currentPage === i ? "btn-active bg-primary" : ""
        } btn-sm`}
      >
        {i + 1}
      </button>
    );
  }

  return <div className="join shadow-xl">{pagArray}</div>;
};

export default PaginationBox;
