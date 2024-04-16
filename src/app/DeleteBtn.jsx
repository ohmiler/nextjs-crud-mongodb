"use client"

import React from 'react'

function DeleteBtn({ id }) {

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                window.location.reload();
            }
        }
    }

  return (
    <a onClick={handleDelete} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>
        Delete
    </a>
  )
}

export default DeleteBtn