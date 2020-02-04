import { AxiosPromise, AxiosResponse } from 'axios';
interface ModelAttributes<T> {
  set(value:T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}
interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}
interface Events {
  on(eventName:string, callback: ()=>void): void;
  trigger(eventName:string): void;
}
interface HasId {
  id?: number
}
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>,
  ){}
  // alt works only if the properties in the construtor are
  // initialised this way( properties gets run before anything else in the class)
  //  like we currently have
  // but if the initialisation wass done outside of the
  // construction we wont be able to use alternative
  // (because the properties will be undefiend at this point)
  // on = this.events.on;
  // get = this.events.get;
  // trigger = this.events.trigger;
  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set (update: T): void {
    this.attributes.set(update);
    this.events.trigger('change')
  }

  fetch():void {
    const id = this.attributes.get('id');

    if(typeof id !== 'number') {
      throw new Error('Cannot fetch without id')
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.attributes.set(response.data)
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((response: AxiosResponse): void =>{
      this.trigger('save');
    })
    .catch(() => {
      this.trigger('error')
    })
  }
}