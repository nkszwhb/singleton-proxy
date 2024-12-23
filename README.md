# singleton-proxy

一个轻量级的 TypeScript 单例模式实现，使用 Proxy 确保类或函数只有一个实例。

## 特性

- ✨ 同时支持类和函数的单例模式
- 🚀 使用 Proxy 实现，零侵入性
- 📦 零依赖
- 💪 完整的 TypeScript 类型支持

## 安装

```bash
npm install singleton-proxy
```

## 使用方法

### 类的单例模式

```typescript
import { singleton } from 'singleton-proxy';

class UserService {
  private config: string;

  constructor(config: string) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}

// 转换为单例类
const SingletonUserService = singleton(UserService);

// 使用
const service1 = new SingletonUserService('config1');
const service2 = new SingletonUserService('config2');
console.log(service1 === service2); // true
console.log(service1.getConfig()); // 'config1'
```

### 函数的单例模式

```typescript
import { singleton } from 'singleton-proxy';

function testFunction(value: number) {
  return {
    value,
    timestamp: Date.now()
  };
}

// 转换为单例函数
const singletonFunction = singleton(testFunction);

// 使用
const result1 = singletonFunction(1);
const result2 = singletonFunction(2);

console.log(result1 === result2); // true
console.log(result1.value); // 1
```

## API

### singleton<T>(target: Constructor<T> | Function<T>)

将类或函数转换为单例模式。

#### 参数
- `target`: 要转换的类或函数

#### 返回值
返回一个代理对象，确保目标类或函数只会创建一个实例。

## 注意事项

1. 第一次创建的实例会被缓存
2. 后续的构造调用会返回第一次创建的实例，忽略新的参数
3. 适用于需要全局唯一实例的场景，如：
   - 数据库连接
   - 配置管理
   - 缓存服务
   - 日志服务

## 兼容性

- 支持 ES2018 及以上版本
- 需要环境支持 Proxy API
- 支持所有现代浏览器和 Node.js

## 开发

```bash
npm install
npm run test
```

## 许可证

MIT License

Copyright (c) 2024
