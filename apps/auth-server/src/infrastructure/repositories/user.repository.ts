import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOneByUserId(userId: string): Promise<User | null> {
        return await this.userModel.findOne({userId}).exec();
    }

    async findOne(id: string): Promise<User | null> {
        return await this.userModel.findById(id).exec();
    }

    async save(user: Partial<User>): Promise<void> {
        const createdUser = new this.userModel(user);
        await createdUser.save();
    }

    async update(id: string, updateData: Partial<User>): Promise<User | null> {
        const userDoc = await this.userModel.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        ).exec();
        return userDoc;
    }

    async delete(id: string): Promise<void> {
        await this.userModel.deleteOne({ _id: id }).exec();
    }
}
