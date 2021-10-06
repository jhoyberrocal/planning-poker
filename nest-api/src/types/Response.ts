import { ApiProperty } from '@nestjs/swagger';

export class Response<T> {
  data: T;
}

export class TokenResponse {
  @ApiProperty()
  access_token: string;
}
