import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps>{
  onSetAgeClick = (): void =>{
    this.model.setRandomAge();
  }
  onSaveClick = (): void =>{
    this.model.save();
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
      'click:.save-model': this.onSaveClick,
    }
  }
  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class= "change-name">Change Name</button>
        <button class="set-age"> Set random age </button>
        <button class="save-model"> Save User </button>
      </div>
    `
  }
}
