import { Button, PageHeader } from 'antd'
import { useEffect, useState } from 'react'
import { getUsernameFromToken } from '../utils'

export default function Header() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const user = getUsernameFromToken()
    if (user) setUsername(user)
  }, [])

  if (username)
    return (
      <PageHeader
        extra={[
          <Button key="1">Feed</Button>,
          <Button key="2">Browse Models</Button>,
          <Button key="3" type="link">
            Logout
          </Button>,
        ]}
      />
    )

  // For unauthenticated users
  return (
    <PageHeader
      extra={[
        <Button key="1">Login</Button>,
        <Button key="2">Join ModelKit</Button>,
      ]}
    />
  )
}
