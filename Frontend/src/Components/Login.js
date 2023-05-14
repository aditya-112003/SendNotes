import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/notecontext';

const Login = () => {
    const context = useContext(noteContext);
    const { showAlert } = context;

    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: "", password: "" })
    const clickSubmit = async (e) => {
        e.preventDefault();

        //Login for User
        //API call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //storing auth token
            localStorage.setItem("token", json.authtoken)
            //redirect
            navigate('/');
            showAlert("You are Logged in Successfully", "success")
        } else {
            console.log(json.error)
            showAlert("Either the password or username is incorrect", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-3'>
            <h1 className='my-3'>Login  <h3>to continue</h3></h1>
            <form onSubmit={clickSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credential.password} onChange={onChange} />
                    <Link to="/signup" class="alert-link ">Already have an account ?</Link>
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </div>
    )
}

export default Login