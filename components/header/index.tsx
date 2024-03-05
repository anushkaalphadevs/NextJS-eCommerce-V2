import { useState, useEffect, useRef, useContext } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetCurrencyQuery, useGetStoreConfigurationsQuery } from 'store/api';
import { DataContext } from 'layouts/Main';


type HeaderType = {
  isErrorPage?: Boolean;
}

const Header = ({ isErrorPage }: HeaderType) => {
  const  selectedData  = useContext(DataContext);
  console.log(selectedData.selectedDefaultcurrency)
  const router = useRouter();
  const cartItems = useState([]);
  const arrayPaths = ['/'];  
  const {data:currency} = useGetCurrencyQuery([])
  const [onTop, setOnTop] = useState(( !arrayPaths.includes(router.pathname) || isErrorPage ) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const navRef = useRef(null);
  const searchRef = useRef(null);
 const {data:defaultCurrency} =  useGetStoreConfigurationsQuery([])
//  const [defaultCurrencyList, setDefaultCurrencyList] = useState<any>([]);
useEffect(() => {
  getData()
  if(!arrayPaths.includes(router.pathname) || isErrorPage) {
    return;
  }

  headerClass();
  window.onscroll = function() {
    headerClass();
  };

}, [currency,defaultCurrency]);
  const headerClass = () => {
    if(window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }
  const getData = async () => {
    setCurrencyList(await currency)
  }
  const closeMenu = () => {
    setMenuOpen(false);
  }
 
  const selectedCurrencyEvent = (event: any) => {
    sessionStorage.setItem('currency', event?.code)
    sessionStorage.setItem('currencyRate', event?.rate)
    location.reload();
  }
  
  const closeSearch = () => {
    setSearchOpen(false);
  }

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <a>
            <h1 className="site-logo">
              <Logo />
              E-Shop
            </h1>
          </a>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products/All Items">
            <a>Products</a>
          </Link>
          <a href="#">Inspiration</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          <div className="dropdown">
            <a style={{marginLeft:"10px"}}>{selectedData.selectedCurrency?.code?selectedData.selectedCurrency?.code:selectedData.selectedDefaultcurrency}</a>
            <div className="dropdown-content">
            {currencyList?.map((currency:any) => (
                <a key={currency?.code} onClick={()=>selectedCurrencyEvent(currency)}>{currency?.code}</a>
               ))}
            </div>
          </div>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems?.length > 0 && (
                <span className="btn-cart__count">{"10"}</span>
              )}
            </button>
          </Link>
          <Link href="/login">
            <button className="site-header__btn-avatar">
              <i className="icon-avatar"></i>
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};


export default Header;
