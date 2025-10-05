import { makeObservable, observable } from "mobx";
import type LoginResponse from "../service/response/LoginResponse";
import { Case } from "../../../base/core/Case";

export default class LoginModel {
  @observable loginState: Case<LoginResponse> = new Case();

  constructor() {
    makeObservable(this);
  }
}
