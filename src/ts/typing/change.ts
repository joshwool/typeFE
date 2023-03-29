import { typeConfig } from "../config/config";
import * as setup from "./setup";

export function Mode(mode: string, type: string, number: number) {
  typeConfig.mode = mode;
  typeConfig.type = type;
  typeConfig.number = number;

  setup.GenTest();
}
