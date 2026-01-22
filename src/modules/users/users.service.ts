import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { GetUserDto } from './dto/get-user.dto';
@Injectable()

export class UsersService {
  
  constructor(private readonly prisma: PrismaService,private readonly bcrypt: BcryptService) {}

  private async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {email},
      select: {email: true},
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }

  async create({
    name,
    lastName,
    avatar,
    email,
    backupEmail,
    phone,
    password,
    country,
    language,
    emailConfirm,
    backupEmailConfirm,
    phoneConfirm,
    twoFactorEnabled,
    twoFactorSecret,
    status,
    authProvider,
    }: CreateUserDto) {
    await this.validateEmail(email);
    return await this.prisma.user.create({
      data: {
        name,
        lastName,
        avatar,
        email,
        backupEmail,
        phone,
        password: await this.bcrypt.hash(password),
        country,
        language,
        emailConfirm,
        backupEmailConfirm,
        phoneConfirm,
        twoFactorEnabled,
        twoFactorSecret,
        status,
        authProvider,
      },
    });
  }
  async findOne({id,email}:GetUserDto){
      const user= await this.prisma.user.findUnique({
        where: {id,email},
      });
      if(!user){
        throw new NotFoundException('User not found');
      }
      return user;
  
    }
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async delete(id: string) {
    await this.findOne({id});
    return await this.prisma.user.delete({
      where: {id},
    });
  }

  async update(id: string, { password, email, ...data }: UpdateUserDto) {
    await this.findOne({ id });
    if (email) {
      await this.validateEmail(email);
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: password && (await this.bcrypt.hash(password)),
        email: email && email,
      },
    });
  }


  
}
