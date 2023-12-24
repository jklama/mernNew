import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleData from './SingleData'

const App = () => {
  const [data, setData] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [newData, setNewData] = useState({
    // Define the structure of your data
    name: '',
    description: '',
    // Add more fields as needed
  })
  const [updateData, setUpdateData] = useState({
    // Define the structure of your data
    _id: '',
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

    if (!isEditing) {
      handleCreate(formData)
    } else {
      handleUpdate(formData)
    }
    console.log(isEditing)
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

  const handleUpdate = async () => {
    try {
      // Make a PUT request to the backend API endpoint with the data ID and updated data

      const response = await axios.put(
        `http://localhost:5000/api/data/${updateData._id}`,
        updateData
      )
      console.log('Data updated successfully:', response.data)

      // Clear the updateData state and refresh the data
      setUpdateData({
        _id: '',
        name: '',
        description: '',
      })
      isEditing(false)
      console.log(isEditing)
      fetchData()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const handleSelectItem = (selectedItemId) => {
    // Find the selected item from the data array
    const selectedItem = data.find((item) => item._id === selectedItemId)

    // Populate the updateData state with the details of the selected item
    setIsEditing(true)
    setNewData({
      _id: selectedItem._id,
      name: selectedItem.name,
      description: selectedItem.description,
      // Add more fields as needed
    })
  }

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend API endpoint with the data ID
      const response = await axios.delete(
        `http://localhost:5000/api/data/${id}`
      )
      console.log('Data deleted successfully:', response.data)

      // Update the local state after deletion
      fetchData()
    } catch (error) {
      console.error('Error deleting data:', error)
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
        <select onChange={(e) => handleSelectItem(e.target.value)}>
          <option value="" disabled>
            Select an Item to Update
          </option>
          {data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
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
          <button type="submit">{isEditing ? 'edit' : 'submit'}</button>
        </form>

        {/* Add more input fields as needed */}
        {/* Add a button to trigger the create operation */}
        {/* <button onClick={handleCreate}>Create Data</button> */}
      </div>
      {data.map((item) => (
        <SingleData key={item._id} handleDelete={handleDelete} item={item} />
      ))}
    </div>
  )
}

export default App
