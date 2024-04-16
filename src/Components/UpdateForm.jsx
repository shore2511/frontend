import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateForm = async (id) => {
    try {
      await axios.put(
        `http://localhost:3002/api/v1/updateForm/${id}`,
        updatedData
      );
      // After successful update, fetch the updated form data
      const response = await axios.get("http://localhost:3002/api/v1/getForm");
      setFormData(response.data.data);
      // Clear the updatedData state
      setUpdatedData({
        name: "",
        email: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error updating form:", error);
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
      <h2>Update Form Data</h2>
      {formData.map((data) => (
        <div key={data._id}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={updatedData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={() => handleUpdateForm(data._id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default UpdateForm;
