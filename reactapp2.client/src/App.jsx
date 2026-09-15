import { useEffect, useState } from "react";
import "./App.css";
import PrinterForm from "./components/PrinterForm";


function App() {

    const [data, setData] = useState([]);

    const apiUrl ="https://localhost:7122/api/Printer/Get";

    const getPrinters = async () => {

        try {

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Failed to get printers");
            }

            const result = await response.json();

            setData(result);

        }
        catch (error) {

            console.error(error);

        }

    };


    // Page Load
    useEffect(() => {

        getPrinters();

    }, []);


    // After Add
    const handlePrinterAdded = () => {

        getPrinters();

    };


    // Edit
    const handleEdit = (id) => {

        console.log("Edit Printer:", id);

    };


    // Delete
    const handleDelete = (id) => {

        console.log("Delete Printer:", id);

    };


    return (

        <div>

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4 px-5">

                <div>

                    <h2 className="mb-1 fw-bold">
                        Printer List
                    </h2>

                    <p className="text-muted mb-0">
                        Manage your printers
                    </p>

                </div>


                {/* ADD FORM */}

                <div className="px-5 mt-4">

                    <PrinterForm
                        onPrinterAdded={handlePrinterAdded}
                    />

                </div>

            </div>


            {/* LIST */}

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
                                        handleEdit(printer.printerAutoId)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(printer.printerAutoId)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>


            

        </div>

    );
}

export default App;