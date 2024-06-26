import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    // const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () =>{
        axios.get('/signup')
        .then((res)=>{
            // console.log(res.data);
        })
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        axios.post('/signup',{
            email, username, password
        })
        .then(()=>{
            alert('Registration Successful');
            setEmail('');
            setUsername('');
            setPassword('');
            fetchUsers();
            navigate('/login')
        })
        .catch((error)=>{
            console.log('Unable to register')
        })
    }




  return (
    <div className='w-full h-screen flex' >
       
      <div className='w-[100%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center' >
      
        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'
        onSubmit={handleRegister}
        >
            <label>Email</label> <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            /> <br/>
            <label>Username</label> <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            /> <br/>
            <label>Password</label> <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' 
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            /> <br/> <br/>
            <button className='w-[200px] h-[50px] border hover:bg-teal-900'
            type='submit'
            >Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
