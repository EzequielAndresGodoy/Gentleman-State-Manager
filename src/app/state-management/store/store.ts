import { EmptyUserState } from "./state";

export enum SourceOfTruthKeys {
  'USER' = 'user'
}

export const SourceOfTruth = [
  {
    key: SourceOfTruthKeys.USER,
    state: EmptyUserState,
  }
]
