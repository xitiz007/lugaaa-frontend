import { useState, useContext } from "react";
import Menu from "./Menu";
import CartNav from "./CartNav";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { DataContext } from "../store/globalState";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import SearchProduct from "./SearchProduct";

function Header({ user }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const [searchClicked, setSearchClicked] = useState(false);

  const { auth } = state;

  return (
    <>
      <header className="bg-[#232f3e] text-[#fff] sticky top-0 z-50">
        <nav className="shadow-lg">
          <div className="max-w-screen-2xl mx-auto px-4 py-1">
            <div className="flex items-center">
              <div className="flex items-center space-x-7">
                <Link href="/">
                  <a className="text-sm sm:text-base md:text-lg font-medium tracking-widest">
                    Lugaaa
                  </a>
                </Link>
              </div>

              <div className="hidden md:flex md:ml-auto items-center space-x-3 ">
                <SearchBar setSearchClicked={setSearchClicked} />
                <Link href="/cart">
                  <a>
                    <CartNav />
                  </a>
                </Link>
                {!user ? (
                  <>
                    <Link href="/signup">
                      <a className="py-1 px-2 font-medium rounded hover:text-[#e4e1e1] transition duration-300 ease-out">
                        Join us
                      </a>
                    </Link>
                    <span>|</span>
                    <Link href="/login">
                      <a className="py-1 px-2 font-medium rounded hover:text-[#e4e1e1] transition duration-300 ease-out">
                        Sign In
                      </a>
                    </Link>
                  </>
                ) : (
                  <Menu user={user} />
                )}
              </div>
              <div className="md:hidden ml-auto">
                <div className="md:hidden flex space-x-2 items-center">
                  <IconButton
                    onClick={() => setSearchClicked(true)}
                    aria-label="search"
                    component="span"
                  >
                    <SearchIcon className="text-white" />
                  </IconButton>
                  <Link href="/cart">
                    <a>
                      <CartNav />
                    </a>
                  </Link>
                  <button
                    className="outline-none mobile-menu-button"
                    onClick={() => setButtonClicked(!buttonClicked)}
                  >
                    <svg
                      className=" w-6 h-6 text-[#fff]"
                      x-show="!showMenu"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={buttonClicked ? "mobile-menu" : "hidden mobile-menu"}>
            <ul>
              <li>
                <Link href="/about">
                  <a className="block nav-item">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="block nav-item">Contact us</a>
                </Link>
              </li>
              <li>
                {!user ? (
                  <Link href="/login">
                    <a className="block nav-item">Sign In</a>
                  </Link>
                ) : (
                  <Menu user={user} />
                )}
              </li>
            </ul>
          </div>
        </nav>
        {searchClicked && <SearchProduct setSearchClicked={setSearchClicked} />}
      </header>
    </>
  );
}

export default Header;
