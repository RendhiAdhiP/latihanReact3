    import axios from "axios";
    import { useEffect, useState } from "react"
    import { Link, useNavigate } from "react-router-dom";
    export default function JobVacancy() {


        const isLogin = localStorage.getItem('token') ? true : false
        const [isload, setIsLoad] = useState(false)
        const navigate = useNavigate()
        const [vacancy, setVacancy] = useState([]);

        useEffect(() => {
            const token = localStorage.getItem('token')
            
            if (!isLogin) {
                navigate('/')
            } 
            setIsLoad(true)
            // axios.get('http://localhost:8000/api/v1/job_vacancies', {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //     }
            // })
            //     .then((response) => {
            //         setVacancy(response.data.vacancies)
            //         console.log(response.data.Vacancies)

            //     }).catch((error) => {
            //         console.error(error.response.data.message)
            //     })

            const get = async ()  =>{
               
                    const response = await fetch('http://localhost:8000/api/v1/job_vacancies',{
                        headers:{
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    const data = await response.json()
                    if(!response.ok){
                        console.log(response)
                    }
                    setVacancy(data.Vacancies)
                    console.log(data.Vacancies)


                
            }


            setIsLoad(false)

          
            get()


        }, [])



        if (isload == true) {
            return <div className="">...</div>
        } 

        console.log({...vacancy})

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
                                    <a className="nav-link" href="#">Marsito Kusmawati</a>
                                </li>
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
                            <h1 className="display-4">Job Vacancies</h1>
                        </div>
                    </header>
                    {/* <!-- E: Header --> */}

                    <div className="container mb-5">

                        <div className="section-header mb-4">
                            <h4 className="section-title text-muted font-weight-normal">List of Job Vacancies</h4>
                        </div>

                        <div className="section-body">
                            {vacancy ? (
                                vacancy.map((v, i) => {
                                    return (
                                        <article className="spot" key={i}>
                                            <div className="row">
                                                <div className="col-5">
                                                    <h5 className="text-primary">{v?.company}</h5>
                                                    <span className="text-muted">{v?.address}</span>
                                                </div>
                                                <div className="col-4">
                                                    <h5>Available Position {v?.capacity}</h5>
                                                    <span className="text-muted">Desain Grafis (3), Programmer (1), Manager (1)</span>
                                                </div>
                                                <div className="col-3">
                                                    <Link to={`/job-vacancy-detail/${v?.id}`} className="btn btn-danger btn-lg btn-block">
                                                        Detail / Apply
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                            ) : (
                                
                                <div className="">not found</div>
                            )}



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