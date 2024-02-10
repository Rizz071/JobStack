interface Props {
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ filterString, setFilterString }: Props) => {
  return (
    <div className="my-auto mr-4">
      <input
        placeholder="Search"
        type="text"
        name="search_jobs"
        id="search_jobs"
        className="input input-sm input-bordered w-48 rounded-md"
        value={filterString}
        onChange={(event) => setFilterString(event.target.value)}
      />
    </div>
  );
};

export default SearchField;
