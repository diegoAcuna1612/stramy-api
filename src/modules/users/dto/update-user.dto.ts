import { AuthProviderEnum, UserStatusEnum } from "@prisma/client";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
 
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString() 
    avatar?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEmail()
    backupEmail?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()s
    @IsBoolean()
    emailConfirm?: boolean;

    @IsOptional()
    @IsBoolean()
    backupEmailConfirm?: boolean;

    @IsOptional()
    @IsBoolean()
    phoneConfirm?: boolean;

    @IsOptional()
    @IsBoolean()
    twoFactorEnabled?: boolean;

    @IsOptional()
    @IsString()
    twoFactorSecret?: string;

    //sessions: Session[];
    @IsOptional()
    @IsEnum(UserStatusEnum)
    status?: UserStatusEnum;

    @IsOptional()
    @IsEnum(AuthProviderEnum)
    authProvider?: AuthProviderEnum;
    //createdAt: Date;
    //updatedAt: Date;
}
