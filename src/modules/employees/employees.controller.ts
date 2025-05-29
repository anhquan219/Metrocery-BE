import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import {
  EmployeeResponseDto,
  EmployeesListResponseDto,
  DeleteEmployeeResponseDto,
} from './dto/employee-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('employees')
@Controller('api/employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm nhân viên mới' })
  @ApiResponse({
    status: 201,
    description: 'Employee created successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Roles(UserRole.ADMIN)
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeesService.create(createEmployeeDto);
    return { data: employee };
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách nhân viên (có phân trang và tìm kiếm)',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees retrieved successfully',
    type: EmployeesListResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll(@Query() queryDto: QueryEmployeeDto) {
    return this.employeesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết của một nhân viên' })
  @ApiResponse({
    status: 200,
    description: 'Employee retrieved successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(id);
    return { data: employee };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const employee = await this.employeesService.update(id, updateEmployeeDto);
    return { data: employee };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa nhân viên' })
  @ApiResponse({
    status: 200,
    description: 'Employee deleted successfully',
    type: DeleteEmployeeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
