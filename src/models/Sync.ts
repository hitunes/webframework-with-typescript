import axios, {AxiosPromise} from 'axios'


interface HasId {
  id?: number
}
export class Sync<T extends HasId>{
  constructor (public rootUrl: string) {}

  fecth(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data
    if(id) {
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      return axios.post(`${this.rootUrl}`, data)
    }
  }
}

// .then((response: AxiosResponse): void => {
//   this.set(response.data);
// })

// type Callback = (data: {}) => void;

// class Eventer {
//   constructor(public events: {[key: string]: Callback[]}){}

//   on(eventName: string, callback: Callback): void {
//     const handlers = this.events[eventName] || [];
//      handlers.push(callback);
//      this.events[eventName] = handlers
//   }

//   emit(eventName: string, data: {}): void {
//     const handlers = this.events[eventName];
//     if(!handlers || handlers.)
//   }
// }