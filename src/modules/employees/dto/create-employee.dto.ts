import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmployeeRole, EmployeeStatus } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Full name of the employee',
    example: 'Nguyễn Văn A',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fullName: string;

  @ApiProperty({
    description: 'Email address of the employee',
    example: 'employee@metrocery.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the employee',
    example: '0123456789',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  phone: string;

  @ApiPropertyOptional({ description: 'Avatar URL of the employee' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Role of the employee',
    enum: EmployeeRole,
    default: EmployeeRole.STAFF,
  })
  @IsOptional()
  @IsEnum(EmployeeRole)
  role?: EmployeeRole;

  @ApiProperty({
    description: 'Join date of the employee',
    example: '2025-01-26',
  })
  @IsNotEmpty()
  @IsDateString()
  joinDate: string;

  @ApiPropertyOptional({
    description: 'Status of the employee',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;
}
