import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
    };
    create(data: {
        title: string;
        description: string;
    }): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        message: string;
        reviews: (import("mongoose").Document<unknown, {}, import("./schemas/review").Review> & import("./schemas/review").Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
