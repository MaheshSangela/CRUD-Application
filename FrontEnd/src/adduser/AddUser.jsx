import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddUser = () => {

    const users = {
        name: "",
        email: "",
        address: "",
    }
    const [user, setUser] = useState(users)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({ ...user, [name]: value })
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/user",
                user,
                { headers: { "Content-Type": "application/json" } }
            );
            toast.success(response.data.message, { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error.response?.data || error.message);
        }
    };
    return (

        <div className="row justify-content-center mt-5 ">
            <div className="col-10 col-md-4 col-lg-3  ">

                <div className="card shadow-lg px-2 pb-4 rounded-4 ">
                    {/* Go back button      */}

                    <div className=" mt-3 mb-0">
                        <Link to="/" type="button" className="btn btn-secondary btn-sm"><i className="fa-solid fa-backward"></i></Link>
                    </div>

                    <h3 className="text-center mb-4 px-4 text-primary fw-bold flex justify-content-between align-items-evenly flex-col">
                        <i className="fa-solid fa-user-plus me-2"></i>Add New User
                    </h3>

                    <form className=' px-4' onSubmit={submitForm}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                className="form-control rounded-3"
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleChange}
                                name="email"
                                className="form-control rounded-3"
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Address:</label>
                            <input
                                type="text"
                                id="address"
                                onChange={handleChange}
                                name="address"
                                className="form-control rounded-3"
                                placeholder="Enter address"
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary rounded-3">
                                <i className="fa-solid fa-plus me-2"></i>Add User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>




    )
}

export default AddUser
