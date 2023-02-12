import { GentlemanObject } from "./gentleman-object";

export interface SourceOfTruthState {
  key: string;
  state: any;
}

export type SourceOfTruth = Map<string, GentlemanObject>;