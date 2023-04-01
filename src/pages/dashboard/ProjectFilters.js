import {useAuthContext} from '../../hooks/useAuthContext'

const filterList = ["All", "Mine", "development", "design", "marketing", "sales"]

export default function ProjectFilters({currentFilter, changeFilter}) {
    const {darkMode} = useAuthContext()

    const handleclick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className={!darkMode ? "project-filter" : "project-filter darkmode"}>
            <nav>
                <p>Filter by:</p>
                {filterList.map(f => (
                    <button
                        key={f}
                        onClick={() => handleclick(f)} 
                        className={currentFilter === f ? "active" : ""}
                        >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}