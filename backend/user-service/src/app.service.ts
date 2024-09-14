import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { User } from 'entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const hashedPassword = await hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    await this.userRepository.save(user);
    const token = this.jwtService.sign({ email: user.email });
    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({ email: user.email });
    return { token };
  }

  async getProfile(token: string) {
    const decoded = this.jwtService.verify(token);
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    return { email: user.email, name: user.name };
  }

  async updateProfile(token: string, email: string, name: string) {
    const decoded = this.jwtService.verify(token);
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    if (user) {
      user.email = email;
      user.name = name;
      await this.userRepository.save(user);
      return { email: user.email, name: user.name };
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
