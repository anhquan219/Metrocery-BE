import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class EmployeeResponseDto {
  @ApiProperty({ description: 'Employee data' })
  data: Employee;
}

export class EmployeesListResponseDto {
  @ApiProperty({ description: 'List of employees', type: [Employee] })
  data: Employee[];

  @ApiProperty({ description: 'Total number of employees' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;
}

export class DeleteEmployeeResponseDto {
  @ApiProperty({ description: 'Success status' })
  success: boolean;
}
