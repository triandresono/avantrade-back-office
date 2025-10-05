export default class StatusResponse {
  errorCode: string;
  errorCodeList: string[];
  error: string;
  errorList: string[];
  messageCode: string;
  messageCodeList: string[];
  message: string;
  messageList: string[];
  errorId: string;
  success: boolean;

  constructor({
    errorCode = "",
    errorCodeList = [],
    error = "",
    errorList = [],
    messageCode = "",
    messageCodeList = [],
    message = "",
    messageList = [],
    errorId = "",
    success = false,
  }: StatusParams) {
    this.errorCode = errorCode;
    this.errorCodeList = errorCodeList;
    this.error = error;
    this.errorList = errorList;
    this.messageCode = messageCode;
    this.messageCodeList = messageCodeList;
    this.message = message;
    this.messageList = messageList;
    this.errorId = errorId;
    this.success = success;
  }

  static fromMap(map: Record<string, any>): StatusResponse {
    const errorCodeList: string[] = map["errorCodes"] ?? [];
    const errorList: string[] = map["errors"] ?? [];
    const messageCodeList: string[] = map["messageCodes"] ?? [];
    const messageList: string[] = map["messages"] ?? [];

    return new StatusResponse({
      success: map["success"] ?? false,
      errorCode: errorCodeList.join(","),
      errorCodeList: errorCodeList,
      error: errorList.join(","),
      errorList: errorList,
      messageCode: messageCodeList.join(","),
      messageCodeList: messageCodeList,
      message: messageList.join(","),
      messageList: messageList,
      errorId: map["errorUid"] ?? "",
    });
  }

  static exception(e: any): StatusResponse {
    return new StatusResponse({
      message: `[WEB Exception] : ${e.toString()}`,
      success: false,
    });
  }

  static cnd(desc: string = "", errorCode: string = ""): StatusResponse {
    return new StatusResponse({
      errorCode,
      message: desc,
      success: true,
    });
  }
}

interface StatusParams {
  errorCode?: string;
  errorCodeList?: string[];
  error?: string;
  errorList?: string[];
  messageCode?: string;
  messageCodeList?: string[];
  message?: string;
  messageList?: string[];
  errorId?: string;
  success?: boolean;
}
