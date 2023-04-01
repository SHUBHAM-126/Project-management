import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { SiProgress } from 'react-icons/si'
import {CgMenuLeft} from 'react-icons/cg'

export default function Navbar({SetMenuState, MenuState}) {

    const { logout, isPending } = useLogout()

    const { user, darkMode } = useAuthContext()

    const handleMenu = () =>{
        SetMenuState(!MenuState)
        //console.log(menuState)
    }

    return (
        <div className={!darkMode ? 'navbar' : 'navbar darkmode'}>
            {user && <div className='menu-container'><div className={MenuState ? "mob-menu active" : "mob-menu"} onClick={handleMenu}>
                <span className='menu-line-1'></span>
                <span className='menu-line-2'></span>
                <span className='menu-line-3'></span>
            </div></div>}
            <div className='logo'>
                <SiProgress />
                <span>projectManagement</span>
            </div>
            <ul className='nav-links'>
                {!user && (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Signup</NavLink></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                        {isPending && <button className='btn' disabled>Logging out</button>}
                    </li>
                )}
            </ul>
        </div>
    )
}

