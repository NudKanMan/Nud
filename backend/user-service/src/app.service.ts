import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { RmqService } from './rabbitmq/rmq.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly rmqService: RmqService,
  ) {}

  async register(email: string, password: string, name: string) {
    const hashedPassword = await hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    await this.userRepository.save(user);
    this.rmqService.sendMessage(
      { email: user.email, name: user.name, id: user.id },
      'user_exchange',
      'create.user',
    );
    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      name: user.name,
    });
    return { token };
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !(await compare(password, user.password))) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const token = this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
      });
      return { token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProfile(id: string) {
    //const decoded = this.jwtService.verify(token);
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return { email: user.email, name: user.name, id: user.id };
  }

  async updateProfile(token: string, email: string, name: string) {
    const decoded = this.jwtService.verify(token);
    console.log(decoded.email);
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    if (user) {
      user.email = email;
      user.name = name;
      await this.userRepository.save(user);
      const token = this.jwtService.sign({
        email: user.email,
        id: user.id,
        name: user.name,
      });
      const res = { token: token, email: user.email, name: user.name };
      console.log(res);
      return res;
    }
    throw new Error('User not found');
  }

  async deleteProfile(token: string) {
    const decoded = this.jwtService.verify(token);
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    if (user) {
      await this.userRepository.remove(user);
      return { message: 'Profile deleted' };
    }
    throw new Error('User not found');
  }
}
