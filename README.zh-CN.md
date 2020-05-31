# Mapbox-GL plugin - LayerGroup

这是一个 [Mapbox-GL](https://docs.mapbox.com/mapbox-gl-js/overview/) 插件。

该插件提供了 [layer](https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer) 组的管理功能。

[English](./README.md) | [简体中文](./README.zh-CN.md)

## APIs

在 [map](https://docs.mapbox.com/mapbox-gl-js/api/#map) 实例上扩展了以下 API:

-   `addLayerGroup()`
-   `removeLayerGroup()`
-   `getLayerGroupFirstLayerId()`
-   `getLayerGroupLastLayerId()`
-   `addLayerToGroup()`
-   `getLayerGroupLayersId()`
-   `moveLayerGroup()`

由于 API 相对简单，并且数量很少，所以还没有额外提供 API 文档，直接查看 [源码](./src/index.ts)。

## 打包文件

提供了以下捆绑包文件:

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

同时也提供了对应的 **sourcemap** 文件。

## 用法

### 浏览器

在浏览器中，通过 `<script>` 标签引用：

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js"></script>
<!-- 引用该工具库 -->
<script src="../build/bundle.min.js"></script>
```

然后，这样使用：

```js
const map = new mapboxgl.Map({ ... })
map.addLayerGroup('google')
map.addLayerToGroup('google', /* layer{ ... } */)
```

**_如果你无法获取捆绑包文件, 你可以尝试 [自己构建](#build)._**

### Node.js

通过 npm 安装：

```bash
npm install mapbox-gl-plugin-layer-group
```

这样使用：

```js
// ES Module
import 'mapbox-gl-plugin-layer-group'

// CommonJS
require('mapbox-gl-plugin-layer-group')
```

## Typescript

如果你想使用 [typescript](https://www.typescriptlang.org/), **@types/mapbox-gl** 包类型定义中没有包含该插件所提供的 API。不过，该插件提供了扩展的类型定义：

```diff
-import mapboxGL, { Map } from 'mapbox-gl'
+import mapboxGL from 'mapbox-gl'
+import { Map } from 'mapbox-gl-plugin-layer-group'

const map: Map = new mapboxGL.Map({ ... })
```

## 构建

出于你无法获取到 bundle 文件，或者想自己添加额外的地图服务资源等其它原因，你可以自己构建。

首先， `clone` 到本地

```bash
git clone https://github.com/wang1212/mapbox-gl-plugin-layer-group.git <dir>
cd <dir>/
npm install
```

然后，您可以自己修改 **src/** 中的文件，并在完成后运行以下命令：

```bash
npm run build
```

捆绑包文件将在 **build/** 文件夹中生成，包括 **sourcemap** 文件。

## 许可

[MIT](./LICENSE).
