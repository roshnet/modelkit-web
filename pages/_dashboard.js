import { Card, Col, Divider, Image, Row, Typography } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AppContainer from '../layouts/App'
import { getUsernameFromToken } from '../utils'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'

const { Title } = Typography

export default function Dashboard() {
  const [models, setModels] = useState([])

  useEffect(() => {
    const url = new URL('/model/fetch-all', API_HOST).href
    const username = getUsernameFromToken()
    axios.get(url, { params: { username: username } }).then((resp) => {
      setModels(resp.data['models'])
    })
  }, [])

  return (
    <AppContainer>
      <Row align="middle">
        <Col xs={24} sm={6} md={5} lg={4} xl={3} xxl={4}>
          <Image
            src={'/avatar.png'}
            height={120}
            width={120}
            style={styles.profileImage}
          />
        </Col>
        <Col xs={24} sm={18} md={12} lg={12} xl={16} xxl={16}>
          <h2>
            <b>@roshnet</b>
          </h2>
          <p>Developer of this damn website!</p>
        </Col>
      </Row>
      <Divider />
      <Row justify="start">
        <Title type="secondary" level={2}>
          Your Models
        </Title>
        <Divider />
      </Row>
      <Row gutter={[30, 30]}>
        {models.map((model, idx) => {
          return (
            <Col flex="auto" key={idx}>
              <Link href={`/model/${model.uid}`}>
                <Card
                  title={<Title level={4}>{model.name}</Title>}
                  style={{ borderColor: '#ccc' }}
                  hoverable
                >
                  <p>
                    {model.description.slice(0, 50)}
                    {model.description.length > 50 ? <span>...</span> : null}
                  </p>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </AppContainer>
  )
}

const styles = {
  profileImage: {
    borderRadius: '40px',
  },
}
