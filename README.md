# Mapbox-GL plugin - LayerGroup

This is a plugin of [Mapbox-GL](https://docs.mapbox.com/mapbox-gl-js/overview/).

This plug-in provides the management function of [layer](https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer) groups.

[Demo](./test/index.html)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## APIs

The following APIs have been extended on [map](https://docs.mapbox.com/mapbox-gl-js/api/#map) instances:

-   `addLayerGroup()`
-   `removeLayerGroup()`
-   `getLayerGroupFirstLayerId()`
-   `getLayerGroupLastLayerId()`
-   `addLayerToGroup()`
-   `getLayerGroupLayersId()`
-   `moveLayerGroup()`

Because the API is relatively simple and the number is very small, there is no additional API documentation provided. View the [source code](./src/index.ts) directly.

## Bundle

The following bundles are provided:

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

It also provides the corresponding **sourcemap** file.

## Usage

### Browser

In the browser, referenced by the `<script>` tag:

```html
<script src="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js"></script>
<!-- Reference the utils library -->
<script src="../build/bundle.min.js"></script>
```

Then, use it:

```js
const map = new mapboxgl.Map({ ... })
map.addLayerGroup('google')
map.addLayerToGroup('google', /* layer{ ... } */)
```

**_If you can't get the bundle file, you can try to [build it yourself](#build)._**

### Node.js

Install via npm:

```bash
npm install mapbox-gl-plugin-layer-group
```

Use it like this:

```js
// ES Module
import 'mapbox-gl-plugin-layer-group'

// CommonJS
require('mapbox-gl-plugin-layer-group')
```

## Typescript

If you want to use [typescript](https://www.typescriptlang.org/), **@types/mapbox-gl** package type definition does not include the API provided by the plugin. However, the plugin provides expanded type definitions:

```diff
-import mapboxGL, { Map } from 'mapbox-gl'
+import mapboxGL from 'mapbox-gl'
+import { Map } from 'mapbox-gl-plugin-layer-group'

const map: Map = new mapboxGL.Map({ ... })
```

## Build

If you cannot get the bundle file, or you want to add additional map service resources and other reasons, you can build your own.

First, `clone` to local

```bash
git clone https://github.com/wang1212/mapbox-gl-plugin-layer-group.git <dir>
cd <dir>/
npm install
```

Then you can modify the files in **src/** by yourself, and run the following command when finished:

```bash
npm run build
```

The bundle file will be generated in the **build/** folder, include **sourcemap** file.

## License

[MIT](./LICENSE).
