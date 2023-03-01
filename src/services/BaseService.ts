import axios from "axios";

export class BaseService {
    public path: string;
    basePath = 'http://localhost:3001/';
    setMessage: any;

    constructor(path: string, setMessage: any,) {
        this.path = this.basePath + path;
        this.setMessage = setMessage;
    }

    getAll() {
        return axios.get(this.path)
    }

    getById(id: string) {
        return axios.get(`${this.path}:${id}`).catch(err => this.setMessage({type:'danger', message: err.response.data.err}))}

    find(params: any) {
        return axios.get(`${this.path}`, { params }).catch(err => this.setMessage({type:'danger', message: err.response.data.err}))
    }

    create(object: any) {
        return axios.post(`${this.path}`, object).catch(err => this.setMessage({type:'danger', message: err.response.data.err}))
    }

    update(object: any) {
        return axios.put(`${this.path}`, object).catch(err => this.setMessage({type:'danger', message: err.response.data.err}))}

    delete(id: string) {
        return axios.delete(`${this.path}/${id}`).catch(err => this.setMessage({type:'danger', message: err.response.data.err}))
    }
}