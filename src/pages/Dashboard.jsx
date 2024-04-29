import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const isLogin = localStorage.getItem('token') ? true : false
    const [isload, setIsLoad] = useState(false)
    const navigate = useNavigate()
    const [validation, setValidation] = useState([null]);
    const [applications, setApplications] = useState([null]);

    useEffect(() => {
        if (!isLogin) {
            navigate('/')
        } else {
            const token = localStorage.getItem('token')
            setIsLoad(true)
            axios.get('http://localhost:8000/api/v1/validations', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    // console.log(response.data.validation)
                    setValidation(response.data.validation)

                }).catch((error) => {
                    console.error(error.response.data.message)
                })

            

            axios.get('http://localhost:8000/api/v1/applications', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    // console.log(response.data.vacancies)
                    setApplications(response.data.vacancies)

                }).catch((error) => {
                    console.error(error.response.data.message)
                })
            
                setIsLoad(false)

        }



    }, [])

    if (isload == 'true') {
        return <div className="">...</div>
    } else if (validation == null) {
        <div className=""></div>
    }

    // console.log(validation)

    return (
        <div>

            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Job Seekers Platform</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Marsito Kusmawati</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    {/* <!-- S: Data Validation Section --> */}
                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Data Validation</h4>
                        </div>
                        <div className="row">

                            {/* <!-- S: Link to Request Data Validation --> */}
                            <div className="col-md-4">
                                <div className="card card-default">
                                    <div className="card-header">
                                        <h5 className="mb-0">Data Validation</h5>
                                    </div>
                                    <div className="card-body">
                                        <Link to="/data-validation" className="btn btn-primary btn-block">+ Request validation</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- E: Link to Request Data Validation --> */}

                            {/* <!-- S: Society Data Validation Box (Pending) --> */}
                            {validation ? (
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Data Validation</h5>
                                        </div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped mb-0">
                                                <tr>
                                                    <th>Status</th>
                                                    <td><span className="badge badge-info">{validation.status}</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Job Category</th>
                                                    <td className="text-muted">{validation.job_category_id}</td>
                                                </tr>
                                                <tr>
                                                    <th>Job Position</th>
                                                    <td className="text-muted">{validation.job_position}</td>
                                                </tr>
                                                <tr>
                                                    <th>Reason Accepted</th>
                                                    <td className="text-muted">{validation.reason_accepted}</td>
                                                </tr>
                                                <tr>
                                                    <th>Validator</th>
                                                    <td className="text-muted">{validation.validator}</td>
                                                </tr>
                                                <tr>
                                                    <th>Validator Notes</th>
                                                    <td className="text-muted">{validation.validator}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )

                            }
                        </div>
                    </section>
                    {/* <!-- E: Data Validation Section --> */}

                    {/* <!-- S: List Job Seekers Section --> */}
                    <section className="validation-section mb-5">
                        <div className="section-header mb-3">
                            <div className="row">
                                <div className="col-md-8">
                                    <h4 className="section-title text-muted">My Job Applications</h4>
                                </div>
                                <div className="col-md-4">
                                    <Link to="/job-vacancy" className="btn btn-primary btn-lg btn-block">+ Add Job Applications</Link>
                                </div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="row mb-4">

                                {/* <!-- S: Job Applications info --> */}
                                <div className="col-md-12">
                                    <div className="alert alert-warning">
                                        Your validation must be approved by validator to applying job.
                                    </div>
                                </div>
                                {/* <!-- E: Job Applications info --> */}

                                {/* <!-- S: Job Applications Box (Registered) --> */}
                                {applications && applications.length > 0 ? (
                                    applications?.map((v,i) => {
                                        return(
                                        <div className="col-md-6" key={i}>
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">{v?.company}</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table className="table table-striped mb-0">
                                                        <tr>
                                                            <th>Address</th>
                                                            <td className="text-muted">{v?.addrees}(Pasirkaliki) No. 900, DKI Jakarta</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Position</th>
                                                            <td className="text-muted">
                                                                <ul>
                                                                    <li>{v?.position} <span className="badge badge-info">Pending</span></li>
                                                                    <li>{v?.position} <span className="badge badge-info">Pending</span></li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Apply Date</th>
                                                            <td className="text-muted">{v?.date}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Notes</th>
                                                            <td className="text-muted">{v?.notes}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )})
                                ) : (
                                    ''
                                )
                                }
                                {/* <!-- S: Job Applications Box (Registered) --> */}

                            </div>
                        </div>

                    </section>
                    {/* <!-- E: List Job Seekers Section --> */}

                </div>

            </main >

            {/* // <!-- S: Footer --> */}
            <footer>
                <div className="container">
                    <div className="text-center py-4 text-muted">
                        Copyright &copy; 2023 - Web Tech ID
                    </div>
                </div>
            </footer>
            {/* // <!-- E: Footer --> */}

        </div >
    )
}