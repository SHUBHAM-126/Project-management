import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

export default function Sidebar({MenuState , SetMenuState}) {

    const { user, darkMode, dispatch } = useAuthContext()

    const handleMenu = () => {
        SetMenuState(!MenuState)
    }

    const handlemode = () => {
        dispatch({ type: 'SWITCH_MODE', payload: !darkMode })
    }

    return (
        <div className={MenuState ? 'sidebar open': 'sidebar'}>
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={user.photoURL} />
                    <p>Hey, {user.displayName}</p>
                </div>
                <nav className={darkMode ? "links darkmode" : "links"}>
                    <ul>
                        <li>
                            <NavLink to='/' onClick={handleMenu}>
                                <img src={DashboardIcon} alt="dashboard" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create' onClick={handleMenu}>
                                <img src={AddIcon} alt="new project" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='dark-mode'>
                    <p>Dark mode</p>
                    <div className={darkMode ? 'toggle active' : 'toggle'} onClick={handlemode}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}