import 'dotenv/config'
import jwtLib from 'jsonwebtoken'

interface JWTDataProps {
  id: string
  email: string
}

const sign = (data: JWTDataProps): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  return jwtLib.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' })
}

const verify = (
  token: string
): JWTDataProps | 'JWT_SECRET_NOT_FOUND' | 'INVALID_JWT' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  try {
    const decodedJWT = jwtLib.verify(token, process.env.JWT_SECRET)

    if (typeof decodedJWT === 'string') {
      return 'INVALID_JWT'
    }

    return decodedJWT as JWTDataProps
  } catch (error) {
    return 'INVALID_JWT'
  }
}

export const jwt = { sign, verify }
