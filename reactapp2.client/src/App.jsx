import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const [data, setData] = useState([]);

    const apiUrl = "https://localhost:7122/api/Printer/GetPrinters";

    useEffect(() => {

        const getPrinters = async () => {

            const response = await fetch(apiUrl);

            const result = await response.json();

            setData(result);
        };

        getPrinters();

    }, []);

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
                    </tr>
                </thead>

                <tbody>
                    {data.map((printer) => (
                        <tr key={printer.printerAutoId}>
                            <td>{printer.printerAutoId}</td>
                            <td>{printer.printerName}</td>
                            <td>{printer.model}</td>
                            <td>{printer.ipAddress}</td>
                            <td>
                                {printer.status === 1
                                    ? "Active"
                                    : "Inactive"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default App;