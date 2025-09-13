import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Update = () => {
    const { id } = useParams();  //  get user id from URL
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
    });

    // Fetch existing user data by id
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then((res) => {
                setUser(res.data);   // prefill state with user data
            })
            .catch((err) => {
                console.log("Error fetching user:", err);
            });
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Submit updated data
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/user/${id}`, user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                navigate("/");
            })
            .catch((err) => {
                console.error("Error updating user:", err);
            });
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-10 col-md-6 col-lg-4">
                <div className="card shadow-lg p-4 rounded-4">
                    <div className="mb-3">
                        <Link to="/" className="btn btn-secondary btn-sm">
                            <i className="fa-solid fa-backward"></i>
                        </Link>
                    </div>

                    <h3 className="text-center mb-4 text-primary fw-bold">
                        <i className="fa-solid fa-user-pen me-2"></i> Update User
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="form-control rounded-3"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="form-control rounded-3"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="form-control rounded-3"
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary rounded-3">
                                <i className="fa-solid fa-save me-2"></i> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update;

