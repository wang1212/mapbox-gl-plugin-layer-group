# create lib starter

这是用于构建库的启动开发配置模板。

该构建工具基于 [rollup](http://rollupjs.org/) 和 [typescript](https://www.typescriptlang.org/) 等工具。

[English](./README.md) | [简体中文](./README.zh-CN.md)

## 打包

运行 `npm run build`, 最终将生成以下捆绑包。

    types/
    build/
    ├── bundle.js
    ├── bundle.min.js
    ├── bundle.esm.js
    ├── bundle.esm.min.js
    ├── bundle.cjs.js
    ├── bundle.cjs.min.js
    ├── bundle.umd.js
    └── bundle.umd.min.js

还将生成相应的 **sourcemap** 文件。

## 用法

首先, `clone` 到本地

```bash
git clone https://github.com/wang1212/create-lib-starter.git
git reset --hard typescript
npm install
```

修改 `package.json` 信息, 例如 `name`, `description` 等。

然后, 将仓库远程地址修改为你自己的:

```bash
git remote set-url origin 'your own address'
```

## 其它

由于构建工具的不同，提供了多种选择：

-   [babel](https://github.com/wang1212/create-lib-starter/) - 基于 babel.js 构建。
-   [typescript](https://github.com/wang1212/create-lib-starter/tree/typescript) - 基于 typescript 构建。 (分支)

## 许可

[MIT](./LICENSE).
