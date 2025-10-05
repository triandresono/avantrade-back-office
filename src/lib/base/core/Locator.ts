type Constructor<T> = new (...args: any[]) => T;

type ServiceEntry = {
  instance: any;
  permanent: boolean;
};

const services = new Map<Constructor<any>, ServiceEntry>();

export class Locator {
  static put<T>(token: Constructor<T>, instance: T, permanent = false): T {
    services.set(token, { instance, permanent });
    return instance;
  }

  static lazyPut<T>(token: Constructor<T>, permanent = false): T {
    let entry = services.get(token);
    if (!entry) {
      const instance = new token();
      services.set(token, { instance, permanent });
      return instance;
    }
    return entry.instance;
  }

  static find<T>(token: Constructor<T>): T {
    const entry = services.get(token);
    if (!entry) {
      throw new Error(`Service for ${token.name} not found`);
    }
    return entry.instance;
  }

  static remove<T>(token: Constructor<T>) {
    const entry = services.get(token);
    if (entry && !entry.permanent) {
      if (typeof (entry.instance as any).dispose === "function") {
        (entry.instance as any).dispose();
      }
      services.delete(token);
    }
  }

  static clear() {
    for (const [token, entry] of services.entries()) {
      if (!entry.permanent) {
        if (typeof (entry.instance as any).dispose === "function") {
          (entry.instance as any).dispose();
        }
        services.delete(token);
      }
    }
  }
}