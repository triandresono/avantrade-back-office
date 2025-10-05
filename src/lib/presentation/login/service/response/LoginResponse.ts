import BaseResponse from "../../../../base/response/BaseResponse";
import StatusResponse from "../../../../base/response/StatusResponse";

export default class LoginResponse extends BaseResponse {
  token: string;
  tokenValidUntil: number | null;
  role: string;
  userId: string;
  branchId: string;
  refreshToken: string;
  idleTime: string;
  sessionId: string;
  loginId: string;

  constructor({
    statusResponse = new StatusResponse({}),
    token = "",
    tokenValidUntil = null,
    role = "",
    userId = "",
    branchId = "",
    refreshToken = "",
    idleTime = "",
    sessionId = "",
    loginId = "",
  }: LoginResponseParam) {
    super({ status: statusResponse });
    this.token = token;
    this.tokenValidUntil = tokenValidUntil;
    this.role = role;
    this.userId = userId;
    this.branchId = branchId;
    this.refreshToken = refreshToken;
    this.idleTime = idleTime;
    this.sessionId = sessionId;
    this.loginId = loginId;
  }

  static fromJson(map: Record<string, any>): LoginResponse {
    return new LoginResponse({
      statusResponse: StatusResponse.fromMap(map),
      token: map["token"] ?? "",
      tokenValidUntil: map["tokenValidUntil"] ?? null,
      role: map["role"] ?? "",
      userId: map["userId"] ?? "",
      branchId: map["branchId"] ?? "",
      refreshToken: map["refreshToken"] ?? "",
      idleTime: map["idleTime"] ?? "",
      sessionId: map["sessionId"] ?? "",
      loginId: map["loginId"] ?? "",
    });
  }

  toJson(): Record<string, any> {
    return {
      token: this.token,
      tokenValidUntil: this.tokenValidUntil,
      role: this.role,
      userId: this.userId,
      branchId: this.branchId,
      refreshToken: this.refreshToken,
      idleTime: this.idleTime,
      sessionId: this.sessionId,
      loginId: this.loginId,
    };
  }
}

interface LoginResponseParam {
  statusResponse?: StatusResponse;
  token?: string;
  tokenValidUntil?: number | null;
  role?: string;
  userId?: string;
  branchId?: string;
  refreshToken?: string;
  idleTime?: string;
  sessionId?: string;
  loginId?: string;
}