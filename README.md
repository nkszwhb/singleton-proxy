# singleton-proxy

一个轻量级的 TypeScript 单例模式实现，使用 Proxy 确保类或函数只有一个实例。

## 特性

- ✨ 同时支持类和函数的单例模式
- 🚀 使用 Proxy 实现，零侵入性
- 📦 零依赖
- 💪 完整的 TypeScript 类型支持
- 🔄 支持 CommonJS 和 ESM 模块系统

## 安装

```bash
# 使用 npm
npm install singleton-proxy

# 使用 yarn
yarn add singleton-proxy

# 使用 pnpm
pnpm add singleton-proxy
```

## 使用方法

### CommonJS

```javascript
const { singleton } = require('singleton-proxy');

class UserService {
  constructor(config) {
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

### ESM

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

### 函数单例模式

```typescript
import { singleton } from 'singleton-proxy';

function createConnection(url: string) {
  return {
    url,
    timestamp: Date.now()
  };
}

// 转换为单例函数
const singletonConnection = singleton(createConnection);

// 使用
const conn1 = singletonConnection('url1');
const conn2 = singletonConnection('url2');

console.log(conn1 === conn2); // true
console.log(conn1.url); // 'url1'
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

- 支持 ES2015 (ES6) 及以上版本
- 需要环境支持 Proxy API
- Node.js >= 6.0.0
- 浏览器支持：
  - Chrome >= 49
  - Firefox >= 18
  - Safari >= 10
  - Edge >= 12
- 同时支持 CommonJS 和 ESM 模块系统

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
```

## License

MIT © 2024