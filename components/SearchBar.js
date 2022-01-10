import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";

function SearchBar({ setSearchClicked }) {

  return (
    <div
      className="flex w-[200px] bg-gray-200 items-center rounded-full h-9 cursor-pointer"
      onClick={() => setSearchClicked(true)}
    >
      <div className="flex items-center justify-center p-[6px] cursor-pointer">
        <IconButton aria-label="search" component="span">
          <SearchIcon className="text-black" />
        </IconButton>
      </div>
      <input
        placeholder="Search"
        className="p-2 bg-transparent flex-grow h-full focus:outline-none"
        type="text"
      />
    </div>
  );
}

export default SearchBar;
