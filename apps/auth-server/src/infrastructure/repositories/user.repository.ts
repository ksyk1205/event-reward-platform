import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
    }

    async findOne(userid: string): Promise<User | null> {
        return await this.userModel.findOne({ userid }).exec();
    }

    async save(user: Partial<User>): Promise<void> {
        const createdUser = new this.userModel(user);
        await createdUser.save();
    }

    async update(userid: string, updateData: Partial<User>): Promise<User | null> {
        const userDoc = await this.userModel.findOneAndUpdate({userid}, updateData, {
            new: true,
        }).exec();
        return userDoc;
    }

    async delete(userid: string): Promise<void> {
        await this.userModel.deleteOne({userid}).exec();
    }
}
