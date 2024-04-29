import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function JobVacancyDetail() {

    const isLogin = localStorage.getItem('token') ? true : false
    const [isload, setIsLoad] = useState(false)
    const navigate = useNavigate()
    const [vacancy, setVacancy] = useState([]);
    const [position, setPosition] = useState([]);
    const [apply, setApply] = useState([]);
    const [notes, setNotes] = useState([]);
    const [vacancy_id, setvacancy_id] = useState([]);
    const { id } = useParams()
    const token = localStorage.getItem('token')


    function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:8000/api/v1/applications', {
            vacancy_id,
            notes,
            positions: apply
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response.data.message)

            }).catch((error) => {
                console.error(error.response.data)
            })


        navigate('/dashboard')

    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!isLogin) {
            navigate('/')
        }
        setIsLoad(true)
       
        const get = async () => {

            const response = await fetch(`http://localhost:8000/api/v1/job_vacancies/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(response)
            }
            setVacancy(data.Vacancies)
            setPosition(data.Vacancies.available_position)
            setvacancy_id(data.Vacancies.id)
            // console.log(data.Vacancies.id)



        }


        setIsLoad(false)


        get()


    }, [])



    if (isload == true) {
        return <div className="">...</div>
    }


    console.log(apply)
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
                    <div className="container text-center">
                        <div>
                            <h1 className="display-4">{vacancy.company}</h1>
                            <span className="text-muted">{vacancy.address}</span>
                        </div>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Description</h3>
                                {vacancy.description}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="form-group">
                                <h3>Select position</h3>
                                <table className="table table-bordered table-hover table-striped">
                                    <tr>
                                        <th width="1">#</th>
                                        <th>Position</th>
                                        <th>Capacity</th>
                                        <th>Application / Max</th>
                                        <th rowspan="4" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }} width="1">
                                            <button href="" className="btn btn-primary btn-lg" onClick={(e)=>handleSubmit(e)} >Apply for this job</button>
                                        </th>
                                    </tr>
                                    {vacancy ? (
                                        position?.map((v, i) => {
                                            return (
                                                <tr key={i} onChange={(e) => setApply(v?.position)}  >
                                                    <td><input type="checkbox" /></td>
                                                    <td  >{v?.position}</td>
                                                    <td>{v?.capacity}</td>
                                                    <td>{v?.apply_capacity}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <div className="">job not found </div>
                                    )
                                    }
                                </table>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="d-flex align-items-center mb-3">
                                    <label className="mr-3 mb-0">Notes for Company</label>
                                </div>
                                <textarea onChange={(e) => setNotes(e.target.value)} className="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                            </div>
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