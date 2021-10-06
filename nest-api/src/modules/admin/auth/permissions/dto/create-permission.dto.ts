import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
}
