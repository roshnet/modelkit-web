import jwt from 'jsonwebtoken'
import nookies from 'nookies'

export const getUsernameFromToken = () => {
  const cookies = nookies.get()
  const token = cookies['accessToken']

  if (token) {
    const username = jwt.decode(token)['iss']
    return username
  }
}
