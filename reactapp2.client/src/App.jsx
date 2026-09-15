import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        printerAutoId: 0,
        printerName: "",
        model: "",
        ipAddress: "",
        status: 1
    });

    const apiUrl = "https://localhost:7122/api/Printer/GetPrinters";

    useEffect(() => {

        const getPrinters = async () => {

            const response = await fetch(apiUrl);

            const result = await response.json();

            setData(result);
        };

        getPrinters();

    }, []);

    const handleEdit = async (id) => {

    try {
        const response = await fetch(
            `https://localhost:7122/api/Printer/GetPrinterById/${id}`
        );

        if (!response.ok) {
            throw new Error("Printer not found");
        }

        const result = await response.json();

        console.log(result);

        setFormData({
            printerAutoId: result.printerAutoId,
            printerName: result.printerName,
            model: result.model,
            ipAddress: result.ipAddress,
            status: result.status
        });

        alert("Printer data loaded successfully. You can update it now.");

    } catch (error) {

        console.error(error);

        alert("Printer not found.");
    }
};

    const handleDelete = (id) => {

        const url = `https://localhost:7122/api/Printer/GetPrinterById/${id}`;

        const response =  fetch(url);

        const result =  response.json();

        console.log(result);
    };

    
    return (
        <div>

            <h1>Printer List</h1>

            <table>
                <thead>
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
                 

                    {data.map((printer,index) => (
                       
                        <tr key={printer.printerAutoId}>
                            <td>{ index+1 }</td>
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
                                    onClick={() => handleEdit(printer.printerAutoId)}
                                >
                                    Edit
                                </button>

                                {" || "}

                                <button
                                    onClick={() => handleDelete(printer.printerAutoId)}
                                >
                                    Delete
                                </button>
                            </td>
                    </tr>
                     
                    ))}
                </tbody>
            </table>




            <div className="printer-form">

                <div className="form-group">
                    <label>Printer Name</label>
                    <input
                        type="text"
                        value={formData.printerName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                printerName: e.target.value
                            })
                        }
                        placeholder="Enter printer name"
                    />
                </div>

                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="text"
                        value={formData.model}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                model: e.target.value
                            })
                        }
                        placeholder="Enter printer model"
                    />
                </div>

                <div className="form-group">
                    <label>IP Address</label>
                    <input
                        type="text"
                        value={formData.ipAddress}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                ipAddress: e.target.value
                            })
                        }
                        placeholder="192.168.1.100"
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: Number(e.target.value)
                            })
                        }
                    >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </div>

                <button className="save-btn">
                    Save Printer
                </button>

            </div>
        </div>
    );
}

export default App;