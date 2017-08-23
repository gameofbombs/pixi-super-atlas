/// <reference path="../../dist/pixi-super-atlas.d.ts" />

let app = new PIXI.Application({autoStart: false, width: 800, height: 800});

document.body.appendChild(app.view);

let loader = new PIXI.loaders.Loader("../assets/");
let atlas = PIXI.atlas.SuperAtlas.create({width: 768, height:768});

let options = {metadata: {runtimeAtlas: atlas}};

loader.add('spritesheet', 'monsters.json', options)
	.add('spinObj_01', 'spinObj_01.png', options)
	.add('spinObj_02', 'spinObj_02.png', options)
	.add('spinObj_03', 'spinObj_03.png', options)
	.add('spinObj_04', 'spinObj_04.png', options)
	.add('spinObj_05', 'spinObj_05.png', options)
	.add('spinObj_06', 'spinObj_06.png', options)
	.add('spinObj_07', 'spinObj_07.png', options)
	.add('spinObj_08', 'spinObj_08.png', options)
	.add('panda', 'panda.png', options)
	.load(function (loader, resources) {
		let x = atlas.repack();
		x.apply();
		console.log(x.failed.length);
		let spr = new PIXI.Sprite(new PIXI.Texture(atlas.baseTexture));
		app.stage.addChild(spr);
		app.start();
	});
