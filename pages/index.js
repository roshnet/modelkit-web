import nookies from 'nookies'
import { useEffect, useState } from 'react'
import Dashboard from './_dashboard'
import Landing from './_landing'

export default function Home() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cookies = nookies.get()
    const accessToken = cookies['accessToken']
    if (accessToken) setToken(accessToken)
    setLoading(false)
  }, [])

  // Return 'Dashboard' if logged in, and 'Landing' otherwise.
  if (loading) return null
  return token ? <Dashboard /> : <Landing />
}
