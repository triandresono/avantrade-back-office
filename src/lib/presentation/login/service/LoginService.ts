import { Either, Left, Right } from "../../../base/core/Either";
import StatusResponse from "../../../base/response/StatusResponse";
import AuthApi from "../../../network/api/auth/AuthApi";
import type HttpUtil from "../../../network/http/HttpUtil";
import LoginResponse from "./response/LoginResponse";

export abstract class LoginService {
  abstract login(
    map: Record<string, any>
  ): Promise<Either<StatusResponse, LoginResponse>>;
}

export class LoginServiceImpl implements LoginService {
  private http: HttpUtil;
  constructor({ http } : LoginServiceImplParams) {
    this.http = http;
  }

  async login(
    map: Record<string, any>
  ): Promise<Either<StatusResponse, LoginResponse>> {
    const response = await this.http.post({
      uri: AuthApi.login,
      body: map,
    });

    return response.fold(
      (error) => new Left(error?.status),
      (response) => {
        const result = LoginResponse.fromJson(response);
        if (result.status.success === true) {
          return new Right(result);
        } else {
          return new Left(result.status);
        }
      }
    ) as any;
  }
}

interface LoginServiceImplParams {
    http: HttpUtil;
}
