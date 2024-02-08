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
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={filterString}
        onChange={(event) => setFilterString(event.target.value)}
      />
    </div>
  );
};

export default SearchField;
