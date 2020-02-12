import { User } from '../models/User';
export class UserForm {
  constructor(public parent: Element, public model: User){
    this.bindModel();
  }
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    })
  }
  onSetAgeClick = (): void =>{
    this.model.setRandomAge();
  }

  onSetNameClick = (): void =>{
    const input = this.parent.querySelector('input');
    if(input){
      const name= input.value

      this.model.set({name});
    }
  }

  eventsMap(): {[key: string]: () => void}{
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.change-name': this.onSetNameClick,
    }
  }
  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button class= "change-name">Change Name</button>
        <button class="set-age"> Set random age </button>
      </div>
    `
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsmap = this.eventsMap()
    for(let eventKey in eventsmap){
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element=>{
        element.addEventListener(eventName, eventsmap[eventKey])
      })
    }
  }
  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content)

    this.parent.append(templateElement.content);
  }
}