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
        return axios.get(`${this.path}/${id}`)
        .catch(err => this.setMessage({type:'danger', message:err?.message}))}

    find(params: any) {
        return axios.get(`${this.path}`, { params }).catch(err =>{ this.setMessage({type:'danger', message: err?.message});
        })
    }

    create(object: any) {
        return axios.post(`${this.path}`, object)
        .then(res=>{
            this.setMessage({message:'Successfully Create', type:'success'});
            return res;
          })
        .catch(err => {this.setMessage({type:'danger', message:err?.response?.statusText || err?.message}); console.log(err)})
    }

    update(object: any, id:string) {
        return axios.put(`${this.path}/${id}`, object)
        .then(res=>{
            this.setMessage({message:'Successfully Update', type:'success'});
            return res;
          })
        .catch(err => this.setMessage({type:'danger', message:err?.message}))}

    delete(id: string) {
        return axios.delete(`${this.path}/${id}`)
        .then(res=>{
            this.setMessage({message:'Successfully Delete', type:'success'});
            return res;
          })
        .catch(err => this.setMessage({type:'danger', message:err?.message}))
    }
}