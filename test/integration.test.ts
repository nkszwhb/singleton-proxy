import { singleton } from '../src/index';

describe('singleton integration', () => {
  it('should work with different instances', () => {
    class TestClass {
      static instances = 0;
      constructor() {
        TestClass.instances++;
      }
    }

    const SingletonA = singleton(TestClass);
    const SingletonB = singleton(TestClass);

    new SingletonA();
    new SingletonB();

    expect(TestClass.instances).toBe(2);
  });
});