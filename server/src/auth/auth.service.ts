import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          name: dto.name,
          phone: dto.phone,
          birthday: new Date(dto.birthday),
          gender: dto.gender,
          role: dto.role,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Invalid email');

    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Incorrect password');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(userId: number, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hash },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    // Check if refresh token has expired
    const tokenExpired = await this.isRefreshTokenExpired(user.refreshToken);
    if (tokenExpired) {
      throw new ForbiddenException('Refresh Token Expired, Please Log In Again');
    }

    try {
      // Verify the refresh token
      const tokenMatches = await argon.verify(user.refreshToken, refreshToken);
      if (!tokenMatches)
        throw new ForbiddenException('Refresh Token Unmatched');

      // Create a new access token
      const payload = { sub: user.id, email: user.email };
      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.get<string>('JWT_SECRET')
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      // Handle verification errors, including expired tokens
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Refresh Token Expired, Please Log In Again');
      } else {
        throw new ForbiddenException('Invalid Refresh Token');
      }
    }
  }

  // Helper function to check if refresh token has expired
  private async isRefreshTokenExpired(refreshToken: string): Promise<boolean> {
    try {
      await argon.verify(refreshToken, 'dummy');
      return false; // Token verification successful, not expired
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return true; // Token expired
      } else {
        throw error; // Other verification errors
      }
    }
  }
}
