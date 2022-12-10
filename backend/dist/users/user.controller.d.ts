import { UsersService } from './user.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    ping(): string;
    createUser(req: any, name: string, alias: string, password: string): Promise<import("./user.entity").User>;
    login(req: any): Promise<{
        User: any;
        msg: string;
    }>;
    getUser(req: any): string;
    updateUser(req: any): Promise<import("typeorm").UpdateResult>;
    logout(req: any): any;
}
