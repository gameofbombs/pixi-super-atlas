# pixi-super-atlas

Plugin allows to create atlas consisted of other atlases or small images. 

Consider that we have atlases in PIXI, we add SuperAtlas class that has BaseTexture but is uploading step-by-step, and MegaAtlas that consists of multiple BaseTextures.

Supported:

* spritesheets
* spine atlas

Not supported yet:

* compressed-textures
* tilemap

## Examples

Work in progress.

## Building

You will need to have [node][node] setup on your machine.

Make sure you have [yarn][yarn] installed:

    npm install -g yarn

Then you can install dependencies and build:

```bash
yarn
yarn build
```

That will output the built distributables to `./bin`.

[node]:             https://nodejs.org/
[typescript]:       https://www.typescriptlang.org/
[yarn]:             https://yarnpkg.com
