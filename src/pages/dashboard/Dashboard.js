import './Dashboard.css'
import {useCollection} from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilters from './ProjectFilters'
import { useState } from "react"
import {useAuthContext} from "../../hooks/useAuthContext"

export default function Dashboard() {

    const {user} = useAuthContext()

    const {documents, error } = useCollection('projects')

    const [currentFilter, setCurrentFilter] = useState("All")

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((doc)=>{
        switch(currentFilter){
            case "All":
                return true
            case "Mine":
                let assignedToMe = false
                doc.assignedUsersList.forEach((u)=>{
                    if (user.uid === u.id){
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case "development":
            case "marketing":
            case "design":
            case "sales":
                console.log(doc.category, currentFilter)
                return doc.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div className='dashboard'>
            <h2 className='page-title'>Dashboard</h2>
            {error && <div className='error'>{error}</div>}
            {documents && <ProjectFilters currentFilter={currentFilter} changeFilter={changeFilter}/>}
            {projects && <ProjectList projects={projects}/>}
        </div>
    )
}