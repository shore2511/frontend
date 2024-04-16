import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteForm = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/getForm"
        );
        console.log("Form data retrieved successfully:", response.data.data);
        setFormData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/deleteForm/${id}`);
      // After successful deletion, fetch the updated form data
      const response = await axios.get("http://localhost:3002/api/v1/getForm");
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-32">
      <h2>Form Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phoneNumber}</td>
              <td>{data.CreatedAt}</td>
              <td>{data.updatedAt}</td>
              <td>
                <button onClick={() => handleDeleteForm(data._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteForm;
