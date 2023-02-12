import { BehaviorSubject } from "rxjs";
import { checkIfPropertyExist } from "../utilities";

export class GentlemanObject {

  private state: any;
  private readonly observableSubject: BehaviorSubject<any>;

  constructor(state: any) {
    this.state = state;
    this.observableSubject = new BehaviorSubject(this.state)
  }

  getObservable() {
    return this.observableSubject.asObservable();
  }

  setObservableValue(value: any, property?: string, emit: boolean = true) {
    if (property && checkIfPropertyExist(this.state, property, `The property ${property} does not exist in the state`)) {
      this.state[property] = value;
    } else {
      this.state = {
        ...this.state,
        ...value
      }
    }
    if (emit){
      this.observableSubject.next(this.state)
    }

  }

  unSubscribe() {
    this.observableSubject.unsubscribe()
  }

}