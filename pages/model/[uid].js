import { Card, Col, Row, Typography } from 'antd'
import axios from 'axios'
import AppContainer from '../../layouts/App'

const API_HOST = process.env.API_HOST || 'http://localhost:8000'
const { Title } = Typography

export async function getServerSideProps({ params }) {
  const { uid } = params
  const url = new URL('/model/fetch-one', API_HOST).href
  const resp = await axios.get(url, { params: { uid: uid } })
  const [model, author] = resp.data['model']

  return {
    props: {
      author,
      description: model.description,
      name: model.name,
    },
  }
}

export default function ViewModel(props) {
  const { author, description, name } = props
  return (
    <AppContainer open={true}>
      <Row justify="center">
        <Col xs={22} sm={20} md={20} lg={18} xl={18} xxl={16}>
          <Title level={2}>{name}</Title>
          <Title level={5}>
            by user <b>@{author}</b>
          </Title>
          <Card title="Model Description" style={{ marginTop: 40 }}>
            <p>{description}</p>
          </Card>
        </Col>
      </Row>
    </AppContainer>
  )
}
