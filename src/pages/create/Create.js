import './Create.css'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

export default function Create() {

    const { documents } = useCollection('users')

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssingedUsers] = useState([])
    const [users, setUsers] = useState([])

    const [formError, setFormError] = useState(null)
    const {user, darkMode} = useAuthContext() 

    const Navigate = useNavigate()

    const {addDocument, response} = useFirestore('projects')

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setFormError(null)

        if (!category){
            setFormError('Please select a category!')
            return
        }

        if (assignedUsers.length < 1){
            setFormError('Please assign the project to atleast 1 user!')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u)=>{
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name, 
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        if (!response.error){
            Navigate('/')
        }
        
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background:'var(--secondary-color)',
            border:'1px solid var(--secondary-color)',
            boxShadow: 'inset 2px 2px 2px var(--primary-color)',
            borderColor: 'var(--primary-color)!important'
        }),
        valueContainer: (provided) => ({
            ...provided,
            boxShadow:'0 0 0 0!important',
            color:'#fff',
        }),
        input:(provided) => ({
            ...provided, 
            color:'#fff',
            boxShadow:'none!important'
        }),
        placeholder:(provided) => ({
            ...provided, 
            color:'#fff',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            background:'#444',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color:'#444',
        }),
        singleValue: (provided) => ({
            ...provided,
            color:'#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            color: '#b8b8b8',
            backgroundColor: state.isFocused ? 'var(--primary-color)' : '',
        }),
        menu: (provided) => ({
            ...provided,
            color:'#b8b8b8',
            background:'var(--secondary-color)',
        }),
        multiValue: (provided) => ({
            ...provided,
            color:'#b8b8b8',
            background:'var(--primary-color)',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color:'#fff',
        })
    }

    return (
        <div className='creact-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>

                <label>
                    <span>Project name</span>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>

                <label>
                    <span>Project details</span>
                    <textarea type="text" value={details} onChange={e => setDetails(e.target.value)} required></textarea>
                </label>

                <label>
                    <span>Set due date</span>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                </label>

                <label>
                    <span>Project category</span>
                    <Select options={categories} onChange={(option) => setCategory(option)} styles={darkMode ? customStyles : ''}
                    theme={!darkMode ? '' : (theme => ({
                        ...theme, 
                        colors:{
                            primary:'black'
                        }
                    })) }
                    />
                </label>

                <label>
                    <span>Assign to</span>
                    <Select options={users} onChange={(option)=>setAssingedUsers(option)} isMulti styles={darkMode ? customStyles : ''}
                    theme={!darkMode ? '' : (theme => ({
                        ...theme, 
                        colors:{
                            primary:'black'
                        }
                    }))}
                    />
                </label>

                <button className="btn">Add project</button>

                {formError && <div className='error'>{formError}</div>}
            </form>
        </div>
    )
}