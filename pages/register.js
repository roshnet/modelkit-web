import { Button, Card, Input } from 'antd'
import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'nookies'
import { useEffect, useState } from 'react'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'

export default function Register() {
  const [height, setHeight] = useState(0)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const handleSignup = () => {
    const url = new URL('/signup', API_HOST).href
    axios
      .post(url, {
        username,
        name,
        password,
      })
      .then((resp) => {
        if (resp.data['result'] === 'fail') {
          setError(resp.data['reason'])
        } else if (resp.data['result'] === 'ok') {
          setCookie(null, 'accessToken', resp.headers['x-auth-token'])
          Router.push('/')
        }
      })
  }

  return (
    <div style={{ ...styles.container, height }}>
      <Card
        title={<p style={styles.heading}>Create an account</p>}
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
          type="text"
          name="name"
          placeholder="Your full name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          style={{ marginBottom: 12 }}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: '#c04', textAlign: 'center' }}>{error}</p>}
        <Button block type="primary" onClick={handleSignup}>
          Join now
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
