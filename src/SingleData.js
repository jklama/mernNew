import React from 'react'

const SingleData = ({ item }) => {
  const { name, description } = item
  return (
    <>
      <article>
        <h1>{name}</h1>
        <p>{description}</p>
      </article>
    </>
  )
}

export default SingleData
