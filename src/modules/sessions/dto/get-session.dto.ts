export class GetAllSessionsDto {
    userId: string;
}

export class GetSessionDto {
    id: string;
    userId: string;
}

export class GetSessionByParams {
    userId: string;
    ip?: string;
    userAgent?: string;
}