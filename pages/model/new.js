import { CloudUploadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Upload } from 'antd'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import AppContainer from '../../layouts/App'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'
const uploadURL = new URL('/model/create', API_HOST).href

export default function CreateModel() {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const cookies = nookies.get()
    const token = cookies['accessToken']
    if (token) {
      setToken(token)
      setUsername(jwt.decode(token)['iss'])
    }
  }, [])

  return (
    <AppContainer>
      <Row justify="center" align="middle">
        <Col>
          <h1>Upload your model's binary</h1>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Upload
            action={uploadURL}
            name="model"
            progress={{
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
              },
              strokeWidth: 3,
              format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
            }}
            headers={{ 'X-Model-Author': username, 'X-Auth-Token': token }}
          >
            <Button icon={<CloudUploadOutlined />} size="large" type="primary">
              Start Upload
            </Button>
          </Upload>
        </Col>
      </Row>
    </AppContainer>
  )
}
