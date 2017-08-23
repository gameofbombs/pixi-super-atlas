/// <reference path="../../dist/pixi-super-atlas.d.ts" />

let app = new PIXI.Application({autoStart: false});

document.body.appendChild(app.view);

let loader = new PIXI.loaders.Loader("../assets/");
let atlas = PIXI.atlas.SuperAtlas.create({width: 512});

let options = {metadata: {runtimeAtlas: atlas}};

loader.add('spritesheet', 'monsters.json')
	.add('spinObj_01', 'spinObj_01.png')
	.add('spinObj_02', 'spinObj_02.png')
	.add('spinObj_03', 'spinObj_03.png')
	.add('spinObj_04', 'spinObj_04.png')
	.add('spinObj_05', 'spinObj_05.png')
	.add('spinObj_06', 'spinObj_06.png')
	.add('spinObj_07', 'spinObj_07.png')
	.add('spinObj_08', 'spinObj_08.png')
	.add('panda', 'panda.png')
	.load(function (loader, resources) {
		let spr = new PIXI.Sprite(new PIXI.Texture(atlas.baseTexture));
		app.stage.addChild(spr);
		app.start();
	});
