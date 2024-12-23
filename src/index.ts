type Constructor<T = any> = new (...args: any[]) => T;
type Function<T = any> = (...args: any[]) => T;

/**
 * 将类或函数转换为单例模式
 * @template T 类或函数的返回类型
 * @param {Constructor<T> | Function<T>} target 要转换的类或函数
 * @returns {Constructor<T> | Function<T>} 返回一个代理对象，确保只会创建一个实例
 * @example
 * ```typescript
 * // 用于类
 * const SingletonClass = singleton(MyClass);
 * const instance = new SingletonClass();
 *
 * // 用于函数
 * const singletonFn = singleton(myFunction);
 * const result = singletonFn();
 * ```
 */
export function singleton<T extends object>(target: Constructor<T>): Constructor<T>;
export function singleton<T extends object>(target: Function<T>): Function<T>;
export function singleton<T extends object>(target: Constructor<T> | Function<T>): Constructor<T> | Function<T> {
  let instance: T | null = null;

  return new Proxy(target, {
    construct(target: Constructor<T>, args: any[]): object {
      if (!instance) {
        instance = new target(...args);
      }
      return instance as object;
    },

    apply(target: Function<T>, thisArg: any, args: any[]): T {
      if (!instance) {
        instance = target.apply(thisArg, args);
      }
      return instance!;
    }
  });
}
