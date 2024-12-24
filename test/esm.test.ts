import { singleton } from '../src/index';

describe('singleton (ESM)', () => {
  class TestClass {
    private value: number;
    constructor(value: number) {
      this.value = value;
    }
    getValue(): number {
      return this.value;
    }
  }

  it('should work with ESM import', () => {
    const SingletonClass = singleton(TestClass);
    const instance1 = new SingletonClass(1);
    const instance2 = new SingletonClass(2);
    expect(instance1).toBe(instance2);
    expect(instance1.getValue()).toBe(1);
  });
});