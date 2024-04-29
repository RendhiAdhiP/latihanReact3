import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function DataValidation() {
    const isLogin = localStorage.getItem('token') ? true : false
    const navigate = useNavigate()
    const [work_experience, setwork_experience] = useState([null]);
    const [job_category_id, setjob_category_id] = useState([null]);
    const [job_position, setjob_position] = useState([null]);
    const [reason_accepted, setreason_accepted] = useState([null]);
    console.log(work_experience)
    console.log(job_category_id)
    console.log(job_position)
    console.log(reason_accepted)
    function handleSubmit(e){
        e.preventDefault()
        const token = localStorage.getItem('token')
        axios.post('http://localhost:8000/api/v1/validations',{
            work_experience,
            job_category_id,
            job_position,
            reason_accepted,
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((response)=>{
            console.log(response.data.message)
        }).catch((error)=>{
            console.error(error.response.data)
        })

        navigate('/dashboard')
    }
    
    useEffect(()=>{
        if(isLogin == false){
            navigate('/')
        }
    },[])

    return (
        <body>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Job Seeker Platform</a>
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
                    <div className="container">
                        <h1 className="display-4">Request Data Validation</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    <form action="" onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Job Category</label>
                                        <select className="form-control-sm" onChange={(e)=>setjob_category_id(e.target.value)} > 
                                            <option value="1">Computing and ICT</option>
                                            <option value="2">Construction and building</option>
                                            <option value="3">Animals, land and environment</option>
                                            <option value="4">Design, arts and crafts</option>
                                            <option value="5">Education and training</option>
                                        </select>
                                    </div>
                                    <textarea onChange={(e)=>setjob_position(e.target.value)} className="form-control" cols="30" rows="5" placeholder="Job position sparate with , (comma)"></textarea>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Work Experiences ?</label>
                                        <select className="form-control-sm">
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <textarea onChange={(e)=>setwork_experience(e.target.value)} className="form-control" cols="30" rows="5" placeholder="Describe your work experiences"></textarea>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label className="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea onChange={(e)=>setreason_accepted(e.target.value)} className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary">Send Request</button>
                    </form>

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