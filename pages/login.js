import { Button, Col, Input, Row } from 'antd'

export default function Login() {
  return (
    <Row justify="space-around" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={4}>
        <form>
          <Input
            style={{ marginBottom: 12 }}
            type="text"
            placeholder="Your username"
          />
          <Input
            style={{ marginBottom: 12 }}
            className="form-group"
            type="password"
            placeholder="Type a password"
          />

          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </form>
      </Col>
    </Row>
  )
}
