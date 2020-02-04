
type Callback = () => void;

export class Eventing {
  events: {[key: string]: Callback[]} = {}
  on = (eventName: string, callback: Callback): void =>{
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach(callback => callback())
  }
  remove = (eventName: string, callbackFn: Callback): void => {
    if(!this.events[eventName] || this.events[eventName].length === 0 ) return;
    const idx = this.events[eventName].indexOf(callbackFn)
    if(idx === -1) return;
    this.events[eventName].splice(idx,1)
  }
}
