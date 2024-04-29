{validation !== null ? (
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