import { Button, Col, Divider, PageHeader, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useEffect, useState } from 'react'

export default function AppContainer(props) {
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const cookies = nookies.get()
    const accessToken = cookies['accessToken']
    if (accessToken) setToken(accessToken)
  }, [])

  // Redirect to login if no token present
  if (!token) {
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
        <PageHeader
          extra={[
            <Button key="1">Feed</Button>,
            <Button key="2">Browse Models</Button>,
            <Button key="3" type="link">
              Logout
            </Button>,
          ]}
        />
        <Divider />
        {props.children}
      </Col>
    </Row>
  )
}
