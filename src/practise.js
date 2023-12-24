import React, { useState, useEffect } from 'react'
import axios from 'axios'

const YourComponent = () => {
  const [data, setData] = useState([])
  const [newData, setNewData] = useState({
    name: '',
    // Add more fields as needed
  })
  const [updateData, setUpdateData] = useState({
    _id: '', // Initialize _id in state
    name: '',
    // Add more fields as needed
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/data',
        newData
      )
      console.log('Data created successfully:', response.data)
      setNewData({
        name: '',
        // Reset other fields as needed
      })
      fetchData()
    } catch (error) {
      console.error('Error creating data:', error)
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/data/${updateData._id}`,
        updateData
      )
      console.log('Data updated successfully:', response.data)
      setUpdateData({
        _id: '', // Reset _id after update
        name: '',
        // Reset other fields as needed
      })
      fetchData()
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  const handleSelectItem = (selectedItemId) => {
    // Find the selected item from the data array
    const selectedItem = data.find((item) => item._id === selectedItemId)

    // Populate the updateData state with the details of the selected item
    setUpdateData({
      _id: selectedItem._id,
      name: selectedItem.name,
      // Add more fields as needed
    })
  }

  return (
    <div>
      {/* Add input fields for creating new data */}
      <input
        type="text"
        placeholder="Name"
        value={newData.name}
        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
      />
      {/* Add a button to trigger the create operation */}
      <button onClick={handleCreate}>Create Data</button>

      {/* Add dropdown menu for selecting an existing item */}
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

      {/* Add input fields for updating existing data */}
      <input
        type="text"
        placeholder="New Name"
        value={updateData.name}
        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
      />
      {/* Add a button to trigger the update operation */}
      <button onClick={handleUpdate}>Update Data</button>

      {/* Render your data in the component */}
      {data.map((item) => (
        <div key={item._id}>
          {item.name}
          {/* Render other fields as needed */}
        </div>
      ))}
    </div>
  )
}

export default YourComponent
