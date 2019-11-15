<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/54139355" height="200px"/>
  <br><br>
  <b>Convert system-ui themes to css variables</b>
  <br><br>
  <img src="https://img.shields.io/badge/maturity-proof--of--concept-d85151?style=flat-square"/>
</p>

&nbsp;

#### install

```
yarn add @ds-tools/theme.css --dev
```

&nbsp;

#### usage

Add it to your `package.json`

```json
{
  "scripts": {
    "css": "theme.css --path examples/theme.js"
  }
}
```

&nbsp;

input:

A theme that follows the [system-ui spec](https://system-ui.com/theme)

```js
/* theme.js */

const theme = {
  space: [0, 4, 8, 16, 32, 64],
  radii: [0, 2, 5, 10],
  fontSizes: [0, 11, 12, 14, 16, 20],
  colors: {
    white: "#fff",
    blues: {
      100: "#EFF8FF",
      500: "#3793E0",
      900: "#203D54"
    }
  }
};

export default theme;
```

output:

```css
/* theme.css */

:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 32px;
  --space-5: 64px;

  --radii-0: 0px;
  --radii-1: 2px;
  --radii-2: 5px;
  --radii-3: 10px;

  --fontSizes-0: 0px;
  --fontSizes-1: 11px;
  --fontSizes-2: 12px;
  --fontSizes-3: 14px;
  --fontSizes-4: 16px;
  --fontSizes-5: 20px;

  --colors-white: #fff;
  --colors-blues-100: #eff8ff;
  --colors-blues-500: #3793e0;
  --colors-blues-900: #203d54;
}
```

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
