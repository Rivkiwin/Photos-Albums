import { BaseService } from "./BaseService";

export class PhotoService extends BaseService {
    constructor(setMessage: any) {
        super('photo/', setMessage)
    }
}