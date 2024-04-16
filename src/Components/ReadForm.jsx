import React, { useState, useEffect } from "react";
import axios from "axios";

const ReadForm = () => {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadForm;
