# 安装使用

## 快速上手

通过 [project-boilerplates](https://github.com/zhouzuchuan/project-boilerplates) 生成开发工程

```bash

npm install project-boilerplates -g

pb init

```

通过命令 `pb` 初始化，选择 `React Of Typescript` 模板

## 已开发项目使用

### 下载

```bash
yarn add react-enhanced
# or
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
    document.getElementById('root'),
);
```
