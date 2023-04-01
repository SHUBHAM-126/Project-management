import './Login.css'
import {useState} from 'react'
import {useLogin} from '../../hooks/useLogin'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error, isPending} = useLogin()

    const handleSubmit = (e) =>{
        e.preventDefault()
        login(email, password)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <label>
                <span>Email</span>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                <span>Password</span>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            {!isPending && <button className='btn'>Log in</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}