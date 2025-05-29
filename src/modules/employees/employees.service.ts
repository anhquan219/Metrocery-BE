import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Kiểm tra email đã tồn tại
    const existingEmployee = await this.employeesRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (existingEmployee) {
      throw new ConflictException('Email already exists');
    }

    const employee = this.employeesRepository.create({
      ...createEmployeeDto,
      joinDate: new Date(createEmployeeDto.joinDate),
    });

    return this.employeesRepository.save(employee);
  }

  async findAll(queryDto: QueryEmployeeDto) {
    const { page = 1, limit = 10, search } = queryDto;
    const skip = (page - 1) * limit;

    const queryBuilder =
      this.employeesRepository.createQueryBuilder('employee');

    // Tìm kiếm theo fullName, email, hoặc phone
    if (search) {
      queryBuilder.where(
        'employee.fullName LIKE :search OR employee.email LIKE :search OR employee.phone LIKE :search',
        { search: `%${search}%` },
      );
    }

    // Sắp xếp theo ngày tạo mới nhất
    queryBuilder.orderBy('employee.createdAt', 'DESC');

    // Phân trang
    queryBuilder.skip(skip).take(limit);

    const [employees, total] = await queryBuilder.getManyAndCount();

    return {
      data: employees,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);

    // Kiểm tra email conflict nếu email được cập nhật
    if (updateEmployeeDto.email && updateEmployeeDto.email !== employee.email) {
      const existingEmployee = await this.employeesRepository.findOne({
        where: { email: updateEmployeeDto.email },
      });

      if (existingEmployee) {
        throw new ConflictException('Email already exists');
      }
    }

    // Cập nhật các fields
    if (updateEmployeeDto.fullName)
      employee.fullName = updateEmployeeDto.fullName;
    if (updateEmployeeDto.email) employee.email = updateEmployeeDto.email;
    if (updateEmployeeDto.phone) employee.phone = updateEmployeeDto.phone;
    if (updateEmployeeDto.avatar !== undefined)
      employee.avatar = updateEmployeeDto.avatar;
    if (updateEmployeeDto.role) employee.role = updateEmployeeDto.role;
    if (updateEmployeeDto.status) employee.status = updateEmployeeDto.status;
    if (updateEmployeeDto.joinDate) {
      employee.joinDate = new Date(updateEmployeeDto.joinDate);
    }
    return this.employeesRepository.save(employee);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const employee = await this.findOne(id);
    await this.employeesRepository.remove(employee);
    return { success: true };
  }
}
