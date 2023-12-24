import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleData from './SingleData'
const YourComponent = () => {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState({
    // Define the structure of your data
    name: '',
    description: '',
    // Add more fields as needed
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Before Form Submission - newData:', newData)

    const formData = {
      name: newData.name,
      description: newData.description,
    }

    console.log('Form Data:', formData)
    handleCreate(formData)

    console.log('After Form Submission - newData:', newData)
  }

  const handleCreate = async () => {
    try {
      console.log('New Data:', newData)

      const response = await axios.post(
        'http://localhost:5000/api/data',
        newData
      )
      console.log('Server response:', response)
      setNewData({
        name: '',
        description: '',
      })
    } catch (error) {
      console.error('Error creating data:', error)
    }
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Make a GET request to the backend API
      const response = await axios.get('http://localhost:5000/api/data')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div>
      {/* Render your data in the component */}
      <div>
        {/* Add input fields for creating new data */}
        <form onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <input
            type="text"
            placeholder="Name"
            value={newData.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newData.description}
            onChange={(e) =>
              setNewData({ ...newData, description: e.target.value })
            }
          />
          <button type="submit">Submit</button>
        </form>

        {/* Add more input fields as needed */}
        {/* Add a button to trigger the create operation */}
        {/* <button onClick={handleCreate}>Create Data</button> */}
      </div>
      {data.map((item) => (
        <SingleData key={item._id} item={item} />
      ))}
    </div>
  )
}

export default YourComponent
