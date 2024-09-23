import { Review } from './schemas/review';
import { Model } from 'mongoose';
export declare class AppService {
    private readonly reviewModel;
    constructor(reviewModel: Model<Review>);
    getHello(): string;
    create(obj: {
        title: string;
        description: string;
    }): Promise<Review>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
