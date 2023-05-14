import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/notecontext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;

  const navigate = useNavigate();
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })
  const clickSubmit = async (e) => {
    e.preventDefault();

    //Sign-Up for User
    //API call
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //storing auth token
      localStorage.setItem("token", json.authtoken)
      //redirect
      navigate('/');
      showAlert("Your account is created successfully", "success")
    } else {
      console.log(json.error)
      showAlert("This Email Already exists check console", "danger")
    }
  }
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mt-3'>
      <h1 className="my-3">Sign-Up <h3>to create new account</h3></h1>
      <form onSubmit={clickSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handleChange} required />
          <div id="name" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm-Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} required />
          <div hidden={credential.password === credential.cpassword} id="name" className="form-text">Both password should match</div>
        <Link to="/login" class="alert-link">Already have an account ?</Link>
        </div>
        <button disabled={credential.password !== credential.cpassword} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup