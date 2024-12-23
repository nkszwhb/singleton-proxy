import { singleton } from '../src/index';

// 测试类的单例模式
class TestClass {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

// 测试函数的单例模式
function testFunction(value: number) {
  return {
    value,
    timestamp: Date.now()
  };
}

describe('singleton', () => {
  describe('类单例测试', () => {
    const SingletonClass = singleton(TestClass);

    it('应该返回相同的实例', () => {
      const instance1 = new SingletonClass(1);
      const instance2 = new SingletonClass(2);

      expect(instance1).toBe(instance2);
      expect(instance1.getValue()).toBe(1); // 应该保持第一次初始化的值
    });
  });

  describe('函数单例测试', () => {
    const singletonFunction = singleton(testFunction);

    it('应该返回相同的结果', () => {
      const result1 = singletonFunction(1);
      const result2 = singletonFunction(2);

      expect(result1).toBe(result2);
      expect(result1.value).toBe(1); // 应该保持第一次调用的值
    });
  });

  describe('边界情况测试', () => {
    it('应该处理异步函数', async () => {
      const asyncFn = singleton(async () => ({ data: 'test' }));
      const result1 = await asyncFn();
      const result2 = await asyncFn();
      expect(result1).toBe(result2);
    });

    it('应该处理带有原型方法的类', () => {
      class Test {
        value: number;
        constructor(v: number) {
          this.value = v;
        }
        getValue() {
          return this.value;
        }
      }
      const SingletonTest = singleton(Test);
      const t1 = new SingletonTest(1);
      const t2 = new SingletonTest(2);
      expect(t1.getValue()).toBe(1);
      expect(t2.getValue()).toBe(1);
    });
  });
});