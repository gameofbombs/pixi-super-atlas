import 'pixi.js';
import '../dist/pixi-super-atlas.js';

//@../node_modules/pixi.js/dist/pixi.min.js
//@../dist/pixi-super-atlas.js

let app = new PIXI.Application({autoStart: false, width: 800, height: 1024});
document.body.appendChild(app.view);

let loader = new PIXI.loaders.Loader("https://pixijs.github.io/examples/required/assets/");
let levels = 4;
let atlas = PIXI.atlas.SuperAtlas.create({width: 1024, height: 1024, mipLevels: levels});
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
	.load(() => {
		let pack = atlas.repack();
		pack.apply();

		let y = 0;
		for (let i = 1; i <= levels; i++) {
			let spr = new PIXI.Sprite(new PIXI.Texture(atlas.baseTexture));
			spr.scale.set(1.0 / (1 << i));
			spr.position.y = y;
			app.stage.addChild(spr);

			y += Math.ceil(atlas.height * spr.scale.y);
		}
		app.start();
	});
