import { Button, Card, Input } from 'antd'
import axios from 'axios'
import Router from 'next/router'
import path from 'path'
import { useEffect, useState } from 'react'

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000'

export default function Login() {
  const [height, setHeight] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const handleLogin = () => {
    axios
      .post(path.join(SERVER_URL, '/api/login'), {
        username,
        password,
      })
      .then((status) => {
        if (status.data.ok) {
          setShowError(false)
          Router.push('/')
        } else {
          setShowError(true)
        }
      })
      .catch((err) => {
        console.error('Caught exception: ', err)
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        backgroundColor: '#000',
      }}
    >
      <Card
        title={
          <p
            style={{ textAlign: 'center', color: '#fff', marginBottom: '-3px' }}
          >
            Log in to your account
          </p>
        }
        style={{ backgroundColor: '#ddd6', width: 300 }}
      >
        <form>
          <Input
            style={{ marginBottom: 12 }}
            type="text"
            placeholder="Your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            style={{ marginBottom: 12 }}
            type="password"
            placeholder="Password"
          />
          {showError && (
            <p style={{ color: '#c04', textAlign: 'center' }}>
              Incorrect credentials!
            </p>
          )}
          <Button block type="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  )
}
