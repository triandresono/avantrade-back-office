import { ErrorCase, SuccessCase } from "../../../base/core/Case";
import type LoginController from "../controller/LoginController";

interface LoginWorkerParams {
  controller: LoginController;
}

export default function LoginWorker({ controller }: LoginWorkerParams) {
  const loginState = controller.model.loginState;
  if (loginState instanceof ErrorCase) {
    // Handle error case
  } else if (loginState instanceof SuccessCase) {
    // Handle success case
  }
}
