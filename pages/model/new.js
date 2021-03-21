import { CloudUploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Row, Upload } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import AppContainer from '../../layouts/App'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'
const uploadURL = new URL('/model/create', API_HOST).href

const { TextArea } = Input

export default function CreateModel() {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

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
    setLoading(true)
    const formData = new FormData()
    formData.append('model', file)
    formData.append('name', name)
    formData.append('username', username)
    formData.append('description', description)
    axios
      .post(uploadURL, formData, {
        headers: { 'X-Model-Author': username, 'X-Auth-Token': token },
      })
      .then(() => {
        setLoading(false)
        message.success({ content: 'Model added!' })
      })
      .catch(() => {
        setLoading(false)
        message.error({ content: 'Something went wrong :(' })
      })
  }

  return (
    <AppContainer>
      <Row>
        <Col>
          <h1>Upload your model's binary</h1>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 42 }}>
        <Col span={18}>
          <Form
            labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
            form={form}
            colon={false}
          >
            <Form.Item
              label="Model Name"
              rules={[
                {
                  required: true,
                  max: 10,
                },
              ]}
              tooltip="Your model will be searched for by this name."
            >
              <Input placeholder="Type a model name..." required />
            </Form.Item>
            <Form.Item label="Upload binary">
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
                <Button
                  icon={<CloudUploadOutlined />}
                  size="large"
                  type="dashed"
                >
                  Select file
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                placeholder="Include the structure of test data required by the model"
                rows={10}
                autoSize={false}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Model ID"
              tooltip="This is used to uniquely identify your model"
            >
              <Input placeholder="Auto-generated model ID" disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={!file}
          onClick={handleUpload}
        >
          Add Model
        </Button>
      </Row>
    </AppContainer>
  )
}
