import { AxiosError, type AxiosResponse } from "axios";
import BaseResponse from "../../base/response/BaseResponse";
import { Left, Right, type Either } from "../../base/core/Either";
import StatusResponse from "../../base/response/StatusResponse";

export default class HttpUtilHandler {
  responseHandler(
    response: AxiosResponse
  ): Either<BaseResponse, Record<string, any>> {
    if (response.status !== 200) {
      if (response?.data && typeof response?.data === "object") {
        return new Left(BaseResponse.fromJson(response.data));
      } else {
        return new Left(
          new BaseResponse({
            status: new StatusResponse({
              errorCode: (response.status ?? 400).toString(),
              message: response.data.message ?? response.statusText,
            }),
          })
        );
      }
    } else {
      return new Right(response.data);
    }
  }

  errorHandler(e: AxiosError<any>): BaseResponse {
    if (e.response?.data && typeof e.response?.data === "object") {
      return BaseResponse.fromJson(e.response?.data);
    } else {
      const code = e.response?.status ?? 400;
      return new BaseResponse({
        status: new StatusResponse({
          errorCode: code.toString(),
          message: "Sorry Something Went Wrong",
        }),
      });
    }
  }
}
