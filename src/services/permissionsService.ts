import { BaseService } from "./BaseService";

export class PermissionsService extends BaseService {
    constructor(setMessage: any) {
        super('permissions/', setMessage)
    }
}