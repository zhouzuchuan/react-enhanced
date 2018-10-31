# 安装使用

## 快速上手

通过 [react-enhanced-cli](https://github.com/zhouzuchuan/react-enhanced-cli) 官方 cli，初始工程

### 安装 CLI

```bash
npm install react-enhanced-cli -g
```

### 创建应用

安装完 react-enhanced-cli 之后，就可以在命令行里访问到 rec 命令。可以通过 rec create 创建新应用

```bash
rec create rec-app
```

然后我们 cd 进入 rec-app 目录，并启动本地开发服务：

```bash
cd rec-app

npm run start
```

## 已开发项目使用

### 下载

```bash
npm install react-enhanced
```

### 使用

通过 `react-enhanced` 的提供的 `init` 方法 生成一个新的 `Provider`，来使用 `react-enhanced` 相应功能

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { init } from 'react-enhanced';

const { Provider } = init({
    // 初始化参数
});

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
);
```
