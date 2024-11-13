
import "./Header.css"
import React from 'react'
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import Nav from "./Nav"

function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        {/* {logo} */}
        <Logo />
        {/* {search bar} */}
        <SearchBar/>
        {/* {nav} */}
        <Nav />

    </header>
  )
}

export default Header