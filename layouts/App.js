import { Button, Col, Divider, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function AppContainer(props) {
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const cookies = nookies.get()
    const accessToken = cookies['accessToken']
    if (accessToken) setToken(accessToken)
  }, [])

  // Redirect to login if no token present
  if (!token && !props.open) {
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
