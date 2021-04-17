import { Button, Card, Input, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useEffect, useState } from 'react'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'

export default function Login() {
  const [height, setHeight] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const handleLogin = () => {
    const url = new URL('/login', API_HOST).href
    setLoading(true)
    axios
      .post(url, { username, password })
      .then((resp) => {
        if (resp.data['result'] === 'ok') {
          setCookie(null, 'accessToken', resp.headers['x-auth-token'])
          router.push('/')
        }
      })
      .catch((err) => {
        message.error({ content: 'Incorrect credentials :(' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ ...styles.container, height }}>
      <Card
        title={<p style={styles.heading}>Log in to your account</p>}
        style={{ backgroundColor: '#ddd6', width: 300 }}
      >
        <Input
          style={{ marginBottom: 12 }}
          type="text"
          name="username"
          placeholder="Your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          style={{ marginBottom: 12 }}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button block type="primary" onClick={handleLogin} loading={loading}>
          Login
        </Button>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '-3px',
  },
}
