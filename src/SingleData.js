import React from 'react'

const SingleData = ({ item, handleDelete }) => {
  const { name, description } = item
  return (
    <>
      <article>
        <h1>{name}</h1>
        <p>{description}</p>
      </article>
      <button onClick={() => handleDelete(item._id)}>Delete</button>
    </>
  )
}

export default SingleData
