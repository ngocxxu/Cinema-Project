import React from 'react'

export default function FlexTailwind(props) {
  return (
    <div className=" w-screen h-screen bg-purple-500">
      <div className="flex justify-center items-center h-1/2 w-full bg-green-500">
        <div className="flexItem w-20 h-20 bg-blue-400"></div>
        <div className="flexItem w-20 h-20 bg-red-400"></div>
        <div className="flexItem w-20 h-20 bg-yellow-400"></div>
      </div>
    </div>
  )
}
