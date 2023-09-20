import 'dotenv/config'
import jwt from 'jsonwebtoken'

interface JwtProps {
  id: string
  email: string
}

export const sign = (data: JwtProps): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export const verify = (
  token: string
): JwtProps | 'JWT_SECRET_NOT_FOUND' | 'INVALID_JWT' => {
  if (!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decodedJWT === 'string') {
      return 'INVALID_JWT'
    }

    return decodedJWT as JwtProps
  } catch (error) {
    return 'INVALID_JWT'
  }
}
