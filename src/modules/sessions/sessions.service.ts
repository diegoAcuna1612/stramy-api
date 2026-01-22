import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto, UpdateSessionDto, GetAllSessionsDto, GetSessionByParams,GetSessionDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
    constructor(private readonly prisma: PrismaService) {}

    async create({
      id,
      userId,
      refreshToken,
      userAgent,
      ipAddress,
      location,
      isActive,
      expiresAt

    }:CreateSessionDto){
        return await this.prisma.session.create({
          data: {
            id,
            userId,
            refreshToken,
            userAgent,
            ipAddress,
            location,
            isActive,
            expiresAt
          },
        });
    }
    async getAll({userId}:GetAllSessionsDto){
        return await this.prisma.session.findMany({
          where: {userId},
          select: {
            id: true,
            userId: true,
            userAgent: true,
            ipAddress: true,
            location: true,
            isActive: true,
            expiresAt: true,
          },
        });
    }

    async getOne({id,userId}:GetSessionDto){
        const session= await this.prisma.session.findUnique({where: {id,userId} });
        if(!session){
            throw new NotFoundException(`Session ${id} not found`);
        }
        return {
            id: session.id,
            userId: session.userId,
            userAgent: session.userAgent,
            ipAddress: session.ipAddress,
            location: session.location,
            isActive: session.isActive,
            expiresAt: session.expiresAt,
          };
    }
    
    
    async update({
      id,
      userId,
      refreshToken,
      userAgent,
      ipAddress,
      location,
      isActive,
      expiresAt
    }:UpdateSessionDto){
      const session= await this.getOne({id,userId});
      if (!session){
        throw new NotFoundException(`Session ${id} not found`);
      }
      return await this.prisma.session.update({
        where: {id,userId},
        data: {
          id,
          userId,
          refreshToken,
          userAgent,
          ipAddress,
          location,
          isActive,
          expiresAt
        },
      });
    }

  
    async delete({id ,userId}:GetSessionDto) {
      await this.getOne({id,userId});
      return await this.prisma.session.delete({
        where: {id,userId},
      });
    }


    async deleteAll({userId}:GetAllSessionsDto){
        return await this.prisma.session.deleteMany({
          where: {userId},
        });
    }


    

    async getByParams({}:GetSessionByParams){}



  
  }
