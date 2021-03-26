import { Button, Col, Divider, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getUsernameFromToken } from '../utils'

export default function AppContainer(props) {
  const [username, setUsername] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const user = getUsernameFromToken()
    if (user) setUsername(user)
  }, [])

  // Redirect to login if no token present
  if (!username && !props.open) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>
          Please login to continue.
          <br />
          <Link href="/login">
            <Button type="primary">Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Render contents of authenticated page
  return (
    <Row justify="center">
      <Col xs={22} sm={20} md={20} lg={18} xl={18} xxl={16}>
        <Header />
        <Divider />
        {props.children}
      </Col>
    </Row>
  )
}
