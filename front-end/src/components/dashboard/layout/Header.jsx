
import "./Header.css"
import Logo from "./Logo"
import Nav from "@components/dashboard/layout/Nav"

function Header() {
  return (
    <header id='header' className='header d-flex justify-content-between align-items-center sticky-top'>
        {/* {logo} */}
        <Logo />
        {/* {nav} */}
        <Nav />
    </header>
  )
}

export default Header