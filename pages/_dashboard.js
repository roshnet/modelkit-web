import { Col, Divider, Image, Row } from 'antd'
import AppContainer from '../layouts/App'

export default function Dashboard() {
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
        <Col>
          <h1>Uploaded models</h1>
        </Col>
      </Row>
    </AppContainer>
  )
}

const styles = {
  profileImage: {
    borderRadius: '40px',
  },
}
