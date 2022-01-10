import { useState } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";

function SearchProduct({ setSearchClicked }) {
  const [text, setText] = useState("");
  const router = useRouter();
  const query = router.query;

  const onSearchHandler = () => {
    if (text !== "") {
      query.category = "all";
      query.search = text;
      router.push({ pathname: "/", query });
      setSearchClicked(false);
    }
  };

  return (
    <div className="bg-[#fff] text-black p-5 absolute top-0 left-0 w-full z-80 h-[250px] shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="hidden sm:flex font-medium tracking-wider text-base sm:text-lg md:text-xl lg:text-2xl">
          Lugaaa
        </h2>
        <div className="flex max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-9 md:h-11 flex-grow bg-gray-100 hover:bg-gray-200 items-center rounded-full cursor-pointer">
          <div className="flex items-center justify-center p-[6px] cursor-pointer">
            <IconButton
              onClick={onSearchHandler}
              aria-label="search"
              component="span"
            >
              <SearchIcon className="text-black" />
            </IconButton>
          </div>
          <input
            placeholder="Search"
            className="p-2 bg-transparent flex-grow h-full rounded-r-full focus:outline-none text-black"
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>

        <IconButton
          onClick={() => setSearchClicked(false)}
          aria-label="search"
          component="span"
        >
          <CloseIcon className="text-black" />
        </IconButton>
      </div>
      <div className="flex flex-col text-center space-y-4 font-normal text-xs sm:text-sm md:text-base mt-4">
        <h3 className="text-gray-500">Popular Search Terms</h3>
        <p className="hover:text-gray-600 cursor-pointer" onClick={() => setText('football jersey')}>Football Jersey</p>
        <p className="hover:text-gray-600 cursor-pointer" onClick={() => setText('joggers')}>Joggers</p>
        <p className="hover:text-gray-600 cursor-pointer" onClick={() => setText('hoddie')}>Hoddie</p>
      </div>
    </div>
  );
}

export default SearchProduct;
