import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdateData = ({ itemId }) => {
  const [data, setData] = useState([])
  const [updateData, setupdateData] = useState({
    // Define the structure of your data
    name: '',
    description: '',
    // Add more fields as needed
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Before Form Submission - updateData:', updateData)

    const formData = {
      name: updateData.name,
      description: updateData.description,
    }

    console.log('Form Data:', formData)
    handleUpdate(formData)

    console.log('After Form Submission - updateData:', updateData)
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Make a GET request to fetch data from the backend API
      const response = await axios.get('http://localhost:5000/api/data')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleUpdate = async (itemId) => {
    try {
      // Make a PUT request to the backend API endpoint with the data ID and updated data
      const response = await axios.put(
        'http://localhost:5000/api/data/${itemId}',
        updateData
      )
      console.log('Server response:', response)
      console.log('Data updated successfully:', response.data)
      setupdateData({
        name: '',
        description: '',
      })
      fetchData()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <input
          type="text"
          placeholder="Name"
          value={updateData.name}
          onChange={(e) =>
            setupdateData({ ...updateData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={updateData.description}
          onChange={(e) =>
            setupdateData({ ...updateData, description: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
//
