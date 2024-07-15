import { Injectable } from '@nestjs/common';
import { Error } from 'src/presentation/responses/error.types';
import { UsersService } from './users.service';
import { ReserveRepository } from 'src/infraestructure/database/repositories/reserves.repository';
import { Reserves } from 'src/domain/entities/reserves.entity';
import { BodyReservesDto } from '../DTOs/body-reserves.dto';
import { CarsService } from './cars.service';
import * as moment from 'moment';
import { IJsonResponse } from 'src/presentation/responses/json-response.contract';

@Injectable()
export class ReserveService {
  constructor(
    private reserveRepository: ReserveRepository,
    private userService: UsersService,
    private carService: CarsService,
  ) {}
  async findAllReserves(status?: string): Promise<Reserves[]> {
    try {
      return await this.reserveRepository.findAllReserves(status);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findReserveByUser(
    reservedUser: string,
    status?: string,
  ): Promise<any[]> {
    await this.userService.findByUsername(reservedUser);
    try {
      return await this.reserveRepository.findReserveByUser(
        reservedUser,
        status,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByPrimary(id: string): Promise<any> {
    /* onst user = await this.userService.findByUsername(reservedUser);
    if (!user) throw Error(404, 'User not found'); */
    try {
      return await this.reserveRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async validateUserReserves(userId: string): Promise<null> {
    try {
      const reserves = await this.reserveRepository.validateUserReserves(
        userId,
      );
      if (reserves) throw Error(401, 'This user has already a reserve ongoing');
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //TODO verificar se reserva já continuou
  async completeReserve(reserveId: string): Promise<null> {
    const { carId } = await this.findByPrimary(reserveId);
    try {
      await this.reserveRepository.update(reserveId, { status: 'complete' });
      await this.carService.update(carId, { avaliable: true, reservedUser: "" });
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async reserve(bodyReserveDto: BodyReservesDto): Promise<any> {
    let { carId, userId, startDate, endDate } = bodyReserveDto;

    try {
      const [
        formattedStartDate,
        formattedEndDate,
        validatedCarId,
        validatedUser,
      ] = await Promise.all([
        this.dateFormatter(startDate),
        this.dateFormatter(endDate),
        this.carService.validateAvaliability(carId),
        this.userService.findByPrimary(userId),
      ]);

      await this.validateUserReserves(userId);

      if (
        formattedStartDate < moment() ||
        formattedStartDate > formattedEndDate
      )
        throw Error(400, 'This date is not valid');

      bodyReserveDto = {
        status: 'ongoing',
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        username: validatedUser.username,
        ...bodyReserveDto,
      };

      const [reserve, updatedCar] = await Promise.all([
        this.reserveRepository.reserve(bodyReserveDto),
        this.carService.update(carId, {
          avaliable: false,
          reservedUser: validatedUser.username,
        }),
      ]);

      return reserve;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async dateFormatter(date: string | moment.Moment): Promise<moment.Moment> {
    return moment(date, 'DD-MM-YYYY');
  }
  async update(id: string, bodyReserveDto: any): Promise<any> {
    try {
      await this.reserveRepository.update(id, bodyReserveDto);
      return this.reserveRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(bodyReserveDto: any): Promise<any> {
    try {
      return this.reserveRepository.delete(bodyReserveDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
