import { checkIfConditionMet } from '../utilities';
import { GentlemanObject } from './gentleman-object';
import { SourceOfTruth, SourceOfTruthState } from './source-of-truth';

export class GentlemanState {

  private observerArray: SourceOfTruth = new Map()

  constructor(sourceOfTruth: SourceOfTruthState[]) {
    
    sourceOfTruth.forEach((SourceOfTruthState) => {
      const {key, state} = SourceOfTruthState
      this.createObservable(key, state)
    });
  }

  private createObservable(key: string, state: any){
    const found = this.observerArray.has(key);
    if (found) {
      console.log(
        `the key ${key} already exists in the source of truth. The action will be ignored.`
      )
    } else {
      const gentlemanObject = new GentlemanObject(state);
      this.observerArray.set(key, gentlemanObject)
    }
  }

  getEntity (key: string): GentlemanObject {
    const found = checkIfConditionMet({
      met: this.observerArray.has(key), 
      value: this.observerArray.get(key)
    },
    `The property ${key} does not exist in the source of truth`
    );
    return found
  }
}
