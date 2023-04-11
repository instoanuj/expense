import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h1>
        Hi! there🙋‍♂️👋
        <br />
        Welcome to Expense Tracker
      </h1>
      <div>
        Your Profile is Incomplete
        <Link to='/completeProfile'>Complete now</Link>
      </div>
    </>
  )
}

export default Home
