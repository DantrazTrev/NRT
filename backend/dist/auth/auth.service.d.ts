import { UsersService } from 'src/users/user.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    validateUser(userName: string, password: string): Promise<any>;
}
