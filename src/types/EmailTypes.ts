export enum EmailType {
  CONFIRM = "confirm",
}

export interface ConfirmEmailData {
  token: string;
  fullHost: string;
}
