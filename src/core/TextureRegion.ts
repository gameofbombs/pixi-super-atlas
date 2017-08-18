namespace pixi_atlas {
	import Texture = PIXI.Texture;
	import Rectangle = PIXI.Rectangle;

	//TODO: support resolution
	//TODO: support no-frame
	//TODO: support updates

	export class TextureRegion extends PIXI.Texture {
		uid = PIXI.utils.uid();

		proxied: Texture;
		entry: AtlasEntry;

		constructor(entry: AtlasEntry, texture: PIXI.Texture = new Texture(entry.baseTexture)) {
			super(entry.currentAtlas.baseTexture,
				new Rectangle(texture.frame.x + entry.currentNode.rect.x,
					texture.frame.y + entry.currentNode.rect.y,
					texture.frame.width,
					texture.frame.height),
				texture.orig,
				texture.trim,
				texture.rotate
			);
			this.proxied = texture;
			this.entry = entry;
		}

		updateFrame() {
			const texture = this.proxied;
			const entry = this.entry;
			this.frame.x = texture.frame.x + entry.currentNode.rect.x;
			this.frame.y = texture.frame.y + entry.currentNode.rect.y;

			this.frame.width = texture.frame.width;
			this.frame.height = texture.frame.height;
		}
	}
}
