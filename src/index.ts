type Constructor<T = any> = new (...args: any[]) => T;
type AnyFunction<T = any> = (...args: any[]) => T;

/**
 * 将类或函数转换为单例模式
 * @template T 类或函数的返回类型
 * @param {Constructor<T> | AnyFunction<T>} target 要转换的类或函数
 * @returns {Constructor<T> | AnyFunction<T>} 返回一个代理对象，确保只会创建一个实例
 */
export function singleton<T extends object>(target: Constructor<T>): Constructor<T>;
export function singleton<T extends object>(target: AnyFunction<T>): AnyFunction<T>;
export function singleton<T extends object>(target: Constructor<T> | AnyFunction<T>): Constructor<T> | AnyFunction<T> {
  let instance: T | null = null;

  return new Proxy(target, {
    construct(target: Constructor<T>, args: any[]): object {
      if (!instance) {
        instance = new target(...args);
      }
      return instance;
    },

    apply(target: AnyFunction<T>, thisArg: any, args: any[]): T {
      if (!instance) {
        instance = target.apply(thisArg, args);
      }
      return instance ?? target.apply(thisArg, args);
    }
  });
}
