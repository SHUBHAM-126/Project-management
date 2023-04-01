import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumnailError] = useState(null)
    const {signup, isPending, error} = useSignup()

    const handleSubmit = (e) =>{
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]    
        console.log(selected)    

        if (!selected){
            setThumnailError('Please select a file!')
            return
        }
        if(!selected.type.includes('image')){
            setThumnailError('Selected file must be an image!')
            return
        }
        if(selected.size > 500000){
            setThumnailError('Image file size must be less than 500kb')
            return
        }
        
        setThumnailError(null)
        setThumbnail(selected)
        console.log('Thumbnail updated!')
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>Email</span>
                <input type='email' value={email} onChange = {e => setEmail(e.target.value)} required/>
            </label>
            <label>
                <span>Password</span>
                <input type='password' value={password} onChange = {e => setPassword(e.target.value)} required/>
            </label>
            <label>
                <span>Display name</span>
                <input type='text' value={displayName} onChange = {e => setDisplayName(e.target.value)} required/>
            </label>
            <label>
                <span>Profile thumbnail</span>
                <input type='file' onChange={handleFileChange} required/>
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}