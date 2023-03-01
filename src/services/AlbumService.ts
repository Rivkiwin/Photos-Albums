import { BaseService } from "./BaseService";

export class AlbumService extends BaseService {
    constructor(setMessage: any) {
        super('album/', setMessage)
    }
}