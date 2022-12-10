import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findUser(alias: string): Promise<User>;
    login(alias: string, password: string): Promise<User>;
    updateProfile(userId: number, updateUserDetails: {
        name: string;
        alias: string;
    }): Promise<import("typeorm").UpdateResult>;
    updatePassword(userId: number, updateUserDetails: {
        password: string;
    }): Promise<import("typeorm").UpdateResult>;
    create(name: string, alias: string, password: string): Promise<User>;
    remove(id: string): Promise<void>;
}
