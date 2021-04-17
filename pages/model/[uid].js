import { Button, Card, Col, Input, message, Row, Typography } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import AppContainer from '../../layouts/App'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'
const { Title, Text } = Typography

export async function getServerSideProps({ params }) {
  const { uid } = params
  const url = new URL('/model/fetch-one', API_HOST).href
  const resp = await axios.get(url, { params: { uid: uid } })
  const { name, description, username } = resp.data['model']

  return {
    props: {
      author: username,
      description,
      name,
      uid,
    },
  }
}

export default function ViewModel(props) {
  const { author, description, name, uid } = props
  const [modelInput, setModelInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const executeModel = () => {
    // Parse array from input
    let xTest
    try {
      xTest = JSON.parse(modelInput)
      if (typeof xTest !== typeof []) throw 'Specified value is not an array.'
    } catch {
      message.error({ content: 'Invalid. Only 2-D arrays are a valid input.' })
      return
    }

    setLoading(true)
    setShowResults(false)

    const url = new URL('/predict', API_HOST).href
    axios
      .post(url, { model_uid: uid, xtest: xTest })
      .then(({ data }) => {
        setResult(data['prediction'])
        setLoading(false)
        setShowResults(true)
      })
      .catch(() => {
        setLoading(false)
        message.error({
          content: "Input shape isn't compatible with the model.",
        })
      })
  }

  return (
    <AppContainer open={true}>
      <Row justify="center">
        <Col xs={22} sm={20} md={20} lg={18} xl={18} xxl={16}>
          <Title level={2}>{name}</Title>
          <Title level={5}>
            by <b>@{author}</b>
          </Title>
          <Text>
            Model ID -
            <Text code copyable>
              {uid}
            </Text>
          </Text>
          <Card
            title={<Text type="secondary">Description</Text>}
            style={{ marginTop: 40 }}
          >
            <p>{description}</p>
          </Card>

          <Card
            title={<Text type="secondary">Try it</Text>}
            style={{ marginTop: 40 }}
          >
            <Row justify="center" gutter={[10, 10]}>
              <Col flex="auto">
                <Input
                  placeholder="Model input, an array within [...]"
                  onChange={(e) => setModelInput(e.target.value)}
                />
              </Col>
              <Col flex="auto" span={6}>
                <Button onClick={executeModel} type="primary" loading={loading}>
                  Execute
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: 24, display: showResults ? '' : 'none' }}>
              <Col span={24}>
                <div style={{ backgroundColor: '#eee9', padding: 10 }}>
                  <Title level={3} keyboard>
                    Result
                  </Title>
                  <Text code>{result}</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </AppContainer>
  )
}
