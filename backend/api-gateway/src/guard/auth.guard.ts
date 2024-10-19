import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUserGuard {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization'];
    if (!token) {
      return false; // No token provided
    }

    const jwtKey = this.configService.get('JWT_SECRET');
    try {
      const decodedToken: any = jwt.verify(
        token.replace('Bearer ', ''),
        jwtKey,
      );
      if (!decodedToken) return false;
      request.userId = decodedToken?.id;
      return true; // Token is valid
    } catch (error) {
      return false; // Token is invalid or expired
    }
  }
}
