import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Reserves } from 'src/domain/entities/reserves.entity';
import { BodyReservesDto } from 'src/application/DTOs/body-reserves.dto';

@Injectable()
export class ReserveRepository {
  constructor(
    @Inject('RESERVE_MODEL')
    private reserveModel: Model<any>,
  ) {}

  async findAllReserves(status?: string): Promise<Reserves[]> {
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    return await this.reserveModel.find(filter).exec();
  }
  async findByPrimary(id: string): Promise<any> {
    try {
      return await this.reserveModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }
  async validateUserReserves(userId: string): Promise<Boolean> {
    const reserves = await this.reserveModel.find({ userId }).where({status: 'ongoing'}).exec();

    return reserves.length === 1;
  }
  async findReserveByUser(username: string, status?: string): Promise<any[]> {
    const filter: any = {};

    if (status) {
      filter.status = status;
      filter.username = username;
    }
    return await this.reserveModel.find(filter);
  }
  async reserve(bodyReserveDto: BodyReservesDto): Promise<BodyReservesDto> {
    const reserve = new this.reserveModel(bodyReserveDto);
    return await reserve.save();
  }
  async update(id: string, bodyReserveDto: any): Promise<any> {
    return await this.reserveModel.findByIdAndUpdate(id, bodyReserveDto);
  }
  async delete(id: number): Promise<any> {
    return this.reserveModel.findByIdAndDelete(id);
  }
}
