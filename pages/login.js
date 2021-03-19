import { Button, Card, Input } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useEffect, useState } from 'react'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'

export default function Login() {
  const [height, setHeight] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const handleLogin = () => {
    const url = new URL('/login', API_HOST).href
    axios
      .post(url, { username, password })
      .then((resp) => {
        if (resp.data['result'] === 'ok') {
          setCookie(null, 'accessToken', resp.headers['x-auth-token'])
          setShowError(false)
          router.push('/')
        } else {
          setShowError(true)
        }
      })
      .catch((err) => {
        // Do something better here like a popup or something
        console.error('Exception caught', err)
      })
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
        {showError && (
          <p style={{ color: '#c04', textAlign: 'center' }}>
            Incorrect credentials!
          </p>
        )}
        <Button block type="primary" onClick={handleLogin}>
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
    backgroundColor: '#000',
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '-3px',
  },
}
