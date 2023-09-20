import 'dotenv/config'
import jwt from 'jsonwebtoken'

interface JWTDataProps {
  id: string
  email: string
}

export const sign = (data: JWTDataProps): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export const verify = (
  token: string
): JWTDataProps | 'JWT_SECRET_NOT_FOUND' | 'INVALID_JWT' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decodedJWT === 'string') {
      return 'INVALID_JWT'
    }

    return decodedJWT as JWTDataProps
  } catch (error) {
    return 'INVALID_JWT'
  }
}
