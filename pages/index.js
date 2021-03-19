import nookies from 'nookies'
import { useEffect, useState } from 'react'
import Dashboard from './_dashboard'
import Landing from './_landing'

export default function Home() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const cookies = nookies.get()
    const accessToken = cookies['accessToken']
    if (accessToken) setToken(accessToken)
  }, [])

  // Return 'Dashboard' if logged in, and 'Landing' otherwise.
  return token ? <Dashboard /> : <Landing />
}
