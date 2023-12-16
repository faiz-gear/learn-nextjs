'use client'

import React, { memo } from 'react'

const Dashboard = memo(() => {
  const [error, setError] = React.useState(false)

  const handleGetError = () => {
    setError(true)
  }

  return <div>{error ? Error() : <button onClick={handleGetError}>Get Error</button>}</div>
})
Dashboard.displayName = 'Dashboard'

export default Dashboard
