import { IsOptional, IsString, IsBoolean, IsDate } from "class-validator";
export class CreateSessionDto {

    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    userId: string;

    @IsString()
    refreshToken: string;

    @IsOptional()
    @IsString()
    userAgent?: string;

    @IsOptional()
    @IsString()
    ipAddress?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsDate()
    expiresAt?: Date;
}
