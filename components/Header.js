import { BuildOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getUsernameFromToken } from '../utils'

export default function Header() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const user = getUsernameFromToken()
    if (user) setUsername(user)
  }, [])

  if (username)
    return (
      <PageHeader
        title={
          <Link href="/">
            <h2
              style={{
                fontFamily: 'mono',
                textDecorationColor: 'Background',
                border: 'solid 1px #ddd',
                padding: 10,
                backgroundColor: '#000',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <BuildOutlined color="#fff" />
              &nbsp;ModelKit
            </h2>
          </Link>
        }
        extra={[
          <Button key="1" onClick={() => router.push('/feed')}>
            Feed
          </Button>,
          <Button key="2" onClick={() => router.push('/model/new')}>
            Add Model
          </Button>,
          <Button key="3" type="link" onClick={() => router.push('/')}>
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
