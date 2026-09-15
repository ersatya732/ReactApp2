function PrinterList({ data, onEdit, onDelete }) {

    return (

        <table className="table table-bordered table-hover">

            <thead className="table-dark">

                <tr>
                    <th>ID</th>
                    <th>Printer Name</th>
                    <th>Model</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                {data.map((printer, index) => (

                    <tr key={printer.printerAutoId}>

                        <td>{index + 1}</td>

                        <td>{printer.printerName}</td>

                        <td>{printer.model}</td>

                        <td>{printer.ipAddress}</td>

                        <td>

                            {printer.status === 1
                                ? "Active"
                                : "Inactive"}

                        </td>

                        <td>

                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                    onEdit(printer.printerAutoId)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    onDelete(printer.printerAutoId)
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );
}

export default PrinterList;