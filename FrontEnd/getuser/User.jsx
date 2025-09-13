import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const User = () => {
  const [users, setUsers] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users")
        setUsers(response.data)
      } catch (error) {
        console.error("Error While fetching users:", error)
      }
    };
    fetchData()
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then((responce) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
        toast.success(responce.data.message, "user deleted successfully", { position: "top-right" });
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (


    <div
      className="userTable d-flex justify-content-center align-items-start py-5"
      style={{ minHeight: "100vh", backgroundColor: "#89deefff", padding: "20px" }}
    >
      <div
        className="table-responsive shadow-lg rounded-4 p-4 bg-white border"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        {/* Add User Button */}
        <div className="d-flex justify-content-start mb-3">
          <Link
            to="/add"
            className="btn btn-primary d-flex align-items-center"
            title="Click to add user"
          >
            <i className="fa-solid fa-user-plus me-2"></i> Add User
          </Link>
        </div>


        {users.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center text-center w-100 py-5" style={{ minHeight: "50vh", backgroundColor: "#f0f8ff", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <i className="fa-solid fa-user-slash fa-3x mb-3 text-secondary"></i>
            <h3 className="mb-2 text-primary fw-bold">No Users Found</h3>
            <p className="mb-3 text-muted">Please add a new user to get started.</p>
          </div>
        ) : (
          // user table
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="d-flex justify-content-center flex-wrap gap-1">

                    {/* Update Button */}
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm btn-primary"
                      title="Click to update user"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-sm btn-danger"
                      title="Click to delete user"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>


  )
}

export default User
