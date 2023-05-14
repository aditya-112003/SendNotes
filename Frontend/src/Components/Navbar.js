import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const handleLogOut= ()=>{
        localStorage.removeItem('token')
        navigate('/login');
    }
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">SendNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link hidden={!localStorage.getItem('token')} className={`nav-link ${location.pathname==='/'? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link hidden={!localStorage.getItem('token')} className={`nav-link ${location.pathname==='/about'? "active" : ""}`} to="/about">About </Link>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <span className="mx-2">
                                <Link hidden={localStorage.getItem('token')} className="btn btn-outline-success" to="login">Login</Link>
                            </span>
                            <span className="mx-2">
                                <Link hidden={localStorage.getItem('token')} className="btn btn-outline-success" to="signup">Sign-Up</Link>
                            </span>
                            <button hidden={!localStorage.getItem('token')} type="submit" className="btn btn-primary" onClick={handleLogOut}>Log-Out</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar