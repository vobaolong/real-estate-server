import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
  sub: string
  'custom:role'?: string
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        role: string
      }
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken
      const userRole = decoded['custom:role'] || ''
      req.user = {
        id: decoded.sub,
        role: userRole
      }

      const hasAccess = allowedRoles.includes(userRole.toLowerCase())
      if (!hasAccess) {
        res.status(403).json({ message: 'Access Denied' })
        return
      }
    } catch (err) {
      console.error('Failed to decode token:', err)
      res.status(400).json({ message: 'Invalid token' })
      return
    }

    next()
  }
}
