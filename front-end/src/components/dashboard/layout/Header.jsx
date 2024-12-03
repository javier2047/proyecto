
import "./Header.css"
import Logo from "./Logo"
import Nav from "@components/dashboard/layout/Nav"

function Header() {
  return (
    <header id='header' className='header d-flex justify-content-between align-items-center sticky-top'>
      <div className="p-2"><Logo /></div>
      <div className="p-2"><Nav /></div>
        {/* {logo} */}
        
        {/* {nav} */}
        
    </header>
  )
}

export default Header