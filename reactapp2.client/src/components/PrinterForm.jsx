
import { useState } from "react";
import "./printerForm.css";


function PrinterForm({ onPrinterAdded }) {

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        printerName: "",
        model: "",
        ipAddress: "",
        status: 1
    });

    const [loading, setLoading] = useState(false);

    const apiUrl = "https://localhost:7122/api/Printer/Create";

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "status" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Printer creation failed");
            }

            const result = await response.json();

            console.log(result);

            alert("Printer added successfully!");

            // Form clear
            setFormData({
                printerName: "",
                model: "",
                ipAddress: "",
                status: 1
            });

            // Modal close
            setShowModal(false);

            // Parent ko inform
            onPrinterAdded();

        }
        catch (error) {

            console.error(error);

            alert("Failed to add printer.");

        }
        finally {

            setLoading(false);

        }
    };

    return (

        <>

            {/* Add Printer Button */}

            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
            >
                + Add Printer
            </button>


            {/* Modal */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="printer-modal">

                        {/* Modal Header */}

                        <div className="modal-header">

                            <h3>Add New Printer</h3>

                            <button
                                type="button"
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>

                        </div>


                        {/* Form */}

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>Printer Name</label>

                                <input
                                    type="text"
                                    name="printerName"
                                    required
                                    value={formData.printerName}
                                    onChange={handleChange}
                                    placeholder="Enter printer name"
                                />

                            </div>


                            <div className="form-group">

                                <label>Model</label>

                                <input
                                    type="text"
                                    name="model"
                                    required
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="Enter printer model"
                                />

                            </div>


                            <div className="form-group">

                                <label>IP Address</label>

                                <input
                                    type="text"
                                    name="ipAddress"
                                    required
                                    value={formData.ipAddress}
                                    onChange={handleChange}
                                    placeholder="192.168.1.100"
                                />

                            </div>


                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    name="status"
                                    required
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>

                                </select>

                            </div>


                            {/* Buttons */}

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Save Printer"
                                    }
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </>

    );
}

export default PrinterForm;
