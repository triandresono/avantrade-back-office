import "reflect-metadata";
import { Container, type ServiceIdentifier, type Newable } from "inversify";

export default class Locator {
  private static container = new Container();

  static put<T>(token: ServiceIdentifier<T>, instance: T): T {
    this.container.unbind(token); 
    this.container.bind<T>(token).toConstantValue(instance);
    return instance;
  }

  /**
   * Untuk auto-inject dependency, class harus diberi decorator @injectable()
   */
  static lazyPut<T>(token: Newable<T>): T {
    this.container.unbind(token); 
    this.container.bind<T>(token).to(token).inSingletonScope();
    return this.container.get<T>(token);
  }

  static find<T>(token: ServiceIdentifier<T>): T {
    return this.container.get<T>(token);
  }

  static remove<T>(token: ServiceIdentifier<T>): void {
    if (this.container.isBound(token)) {
      this.container.unbind(token);
    }
  }

  static clear(tokens: ServiceIdentifier<any>[]): void {
    for (const token of tokens) {
      this.remove(token);
    }
  }
}
