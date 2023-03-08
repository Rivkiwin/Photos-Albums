import axios from "axios";
import { BaseService } from "./BaseService";

export class AlbumService extends BaseService {
    constructor(setMessage: any) {
        super('album/', setMessage)
    }

    getSherd(userId:any) {
        return axios.get(`${this.basePath}sharedAlbums/${userId}`).catch(err => this.setMessage({type:'danger', message:err?.message}))}

}