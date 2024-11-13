
import "./Header.css"
import Logo from "./Logo"
import Nav from "@components/dashboard/layout/Nav"

function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        {/* {logo} */}
        <Logo />
        {/* {nav} */}
        <Nav />
    </header>
  )
}

export default Header