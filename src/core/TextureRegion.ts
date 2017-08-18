namespace pixi_atlas {
	import BaseTexture = PIXI.BaseTexture;
	import Rectangle = PIXI.Rectangle;

	export class AtlasEntry {
		baseTexture: BaseTexture;
		superAtlas: SuperAtlas;
	}

	export class TextureRegion extends PIXI.Texture {
		constructor(baseTexture: BaseTexture, frame?: Rectangle, orig?: Rectangle, trim?: Rectangle, rotate?: number) {
			super(baseTexture, frame, orig, trim, rotate);
		}
	}
}