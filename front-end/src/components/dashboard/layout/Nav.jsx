import '@components/dashboard/layout/nav.css'
import NavNotice from '@components/dashboard/layout/NavNotice'
import NavMessage from '@components/dashboard/layout/NavMessage'
import NavAvatar from '@components/dashboard/layout/NavAvatar'
function Nav() {
  return (
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            <NavNotice />
            <NavMessage />
            <NavAvatar />
        </ul>
    </nav>
  )
}

export default Nav