import { IsOptional, IsString } from "class-validator";

export class GetUserDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    email?: string;
}