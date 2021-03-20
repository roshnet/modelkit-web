import { CloudUploadOutlined } from '@ant-design/icons'
import { Button, Col, message, Row, Upload } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import AppContainer from '../../layouts/App'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'
const uploadURL = new URL('/model/create', API_HOST).href

export default function CreateModel() {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cookies = nookies.get()
    const token = cookies['accessToken']
    if (token) {
      setToken(token)
      setUsername(jwt.decode(token)['iss'])
    }
  }, [])

  const beforeUpload = (f) => {
    setFile(f)
    return false // Prevent auto-upload
  }

  // Manual upload with axios POST and FormData
  const handleUpload = () => {
    const formData = new FormData()
    formData.append('model', file)
    setLoading(true)
    axios
      .post(uploadURL, formData, {
        headers: { 'X-Model-Author': username, 'X-Auth-Token': token },
      })
      .then(() => {
        setLoading(false)
        message.success({ content: 'Upload successful!' })
      })
      .catch(() => {
        setLoading(false)
        message.error({ content: 'Something went wrong :(' })
      })
  }

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
            beforeUpload={(f) => beforeUpload(f)}
            onRemove={() => {
              setFile(null)
            }}
            maxCount={1}
            progress={{
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
              },
              strokeWidth: 3,
              format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
            }}
          >
            <Button icon={<CloudUploadOutlined />} size="large" type="dashed">
              Select file
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ marginTop: '20px' }}>
        <Col>
          <Button
            type="primary"
            size="large"
            loading={loading}
            disabled={!file}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Col>
      </Row>
    </AppContainer>
  )
}
