import { useEffect, useMemo } from "react";
import Locator from "../../../base/core/Locator";
import HttpUtil from "../../../network/http/HttpUtil";
import LoginController from "../controller/LoginController";
import LoginModel from "../model/LoginModel";
import { LoginServiceImpl } from "../service/LoginService";
import LoginWorker from "./LoginWorker";
import { autorun } from "mobx";
import { Form } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import CustomInput from "../../../uikit/shared/CustomInput";
import CustomButton from "../../../uikit/shared/CustomButton";
import { Observer } from "mobx-react";
import { LoadingCase } from "../../../base/core/Case";
import Png from "../../../uikit/assets/Png";

LoginPage.page = "/login_page";

export default function LoginPage() {
  const controller = useMemo(
    () =>
      new LoginController({
        model: new LoginModel(),
        service: new LoginServiceImpl({
          http: Locator.find(HttpUtil),
        }),
      }),
    []
  );

  useEffect(() => {
    const disposer = autorun(() => LoginWorker({ controller }));
    return () => {
      disposer();
    };
  }, [controller]);

  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center justify-center bg-login bg-cover bg-no-repeat">
      <Form
        onFinish={(v) => controller.login({
            username: v.username,
            password: v.password,
        })}
        className="w-full max-w-[700px] px-4"
      >
        <div className=" w-[600px] rounded-xl bg-black/50 px-8 py-8 xl:w-[700px]">
          <div className="mb-5 flex flex-col items-center justify-center space-y-5">
            <img src={Png.AVANTRADE_LOGO} alt="avantrade logo" />
            <Paragraph className="text-4xl font-bold text-white">
              Avantrade Admin
            </Paragraph>
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill in your username/password",
              },
            ]}
          >
            <CustomInput
              maxLength={40}
              placeholder="Username"
              style={{
                backgroundColor: "white",
                transition: "background-color 0.3s",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill in your username/password",
              },
            ]}
          >
            <CustomInput
              maxLength={40}
              placeholder="Password"
              type="password"
              style={{
                backgroundColor: "white",
                transition: "background-color 0.3s",
              }}
            />
          </Form.Item>
          <Observer>
            {() => {
              const state = controller.model.loginState;
              return (
                <CustomButton
                  htmlType="submit"
                  type="netral"
                  className="mt-8 h-12 w-full bg-white text-secondary"
                  loading={state instanceof LoadingCase}
                >
                  Login
                </CustomButton>
              );
            }}
          </Observer>
        </div>
      </Form>
    </div>
  );
}
