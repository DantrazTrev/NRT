"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findUser(alias) {
        return this.usersRepository.findOneBy({ alias });
    }
    async login(alias, password) {
        const user = await this.findUser(alias);
        console.log(user);
        if (!user) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        return user;
    }
    updateProfile(userId, updateUserDetails) {
        return this.usersRepository.update({ userId }, Object.assign({}, updateUserDetails));
    }
    async updatePassword(userId, updateUserDetails) {
        const hashedpassword = await bcrypt.hash(updateUserDetails.password);
        return this.usersRepository.update({ userId }, { password: hashedpassword });
    }
    async create(name, alias, password) {
        const user = await this.findUser(alias);
        if (user) {
            throw new common_1.BadRequestException('Invalid Username');
        }
        const hashedpassword = await bcrypt.hash(password);
        return this.usersRepository.save({ name, alias, password: hashedpassword });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map