import { ErrorCase, LoadingCase, SuccessCase } from "../../../base/core/Case";
import type LoginModel from "../model/LoginModel";
import type { LoginService } from "../service/LoginService";

interface LoginControllerParams {
  service: LoginService;
  model: LoginModel;
}

export default class LoginController {
  readonly service: LoginService;
  readonly model: LoginModel;

  constructor({ service, model }: LoginControllerParams) {
    this.service = service;
    this.model = model;
  }

  async login(map: Record<string, any>) {
    this.model.loginState = new LoadingCase();
    const result = await this.service.login(map);
    result.fold(
      (error) => (this.model.loginState = new ErrorCase(error)),
      (data) => (this.model.loginState = new SuccessCase(data))
    );
  }
}
