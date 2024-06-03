import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, Res, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto, SignInDto } from './dto';
import { responseData } from 'src/config';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) {}

    // Endpoint for signing up a new user
    @Post('signup')
    @ApiBody({ type: AuthDto })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async signup(@Body() dto: AuthDto, @Res() res: Response) {
        const result = await this.authService.signup(dto);
        return responseData(res, 'User created successfully', HttpStatus.CREATED, result);
    }

    // Endpoint for signing in an existing user
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    @ApiBody({ type: SignInDto })
    @ApiResponse({ status: 200, description: 'Sign in successful.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async signin(@Body() dto: SignInDto, @Res() res: Response) {
        const result = await this.authService.signin(dto);
        return responseData(res, 'Sign in successful', HttpStatus.OK, result);
    }

    // Endpoint for refreshing tokens
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    @ApiHeader({ name: 'authorization', description: 'Bearer token' })
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async refreshTokens(@Headers('authorization') authHeader: string, @Body('refreshToken') refreshToken: string, @Res() res: Response) {
        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        // Extract user ID from the expired access token
        const token = authHeader.split(' ')[1];
        let userId: number;

        try {
            const decodedToken = this.jwtService.decode(token) as any;
            userId = decodedToken.sub;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        const tokens = await this.authService.refreshTokens(userId, refreshToken);
        return responseData(res, 'Tokens refreshed successfully', HttpStatus.OK, tokens);
    }
}
