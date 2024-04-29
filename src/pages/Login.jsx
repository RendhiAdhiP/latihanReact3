import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const isLogin = localStorage.getItem('token') ? true : false
    const navigate = useNavigate()
    const [id_card_number,setIdCardNumber] =useState();
    const [password,setPassword] =useState();


    function handelLogin(e){
        e.preventDefault()

        axios.post('http://localhost:8000/api/v1/auth/login',{
            id_card_number,
            password,
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            console.log(response.data)
            localStorage.setItem('token',response.data.body.token)
            localStorage.setItem('user',response.data.body)

        }).catch((error)=>{
            console.error(error.response.data.message)
        })
    }
    
    useEffect(()=>{
        if(isLogin){
            navigate('/dashboard')
        }
    },[])


    return (
        <body>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Job Seekers Platform</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Job Seekers Platform</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form className="card card-default" onSubmit={handelLogin}>
                                <div className="card-header">
                                    <h4 className="mb-0">Login</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">ID Card Number</div>
                                        <div className="col-8"><input type="text" className="form-control" onChange={(e)=>setIdCardNumber(e.target.value)}/></div>
                                    </div>
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8"><input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} /></div>
                                    </div>
                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8"><button className="btn btn-primary">Login</button></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* <!-- S: Footer --> */}
            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2023 - Web Tech ID
                    </div>
                </div>
            </footer>
            {/* <!-- E: Footer --> */}

        </body>
    )
}