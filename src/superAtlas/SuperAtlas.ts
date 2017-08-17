namespace pixi_atlas {
	export class SuperAtlas implements ITextureResource {
		static MAX_SIZE = 2048;

		baseTexture: PIXI.BaseTexture = null;
		format: number = WebGLRenderingContext.RGBA;
		width: number = 2048;
		height: number = 2048;
		autoResize: boolean = false;

		onTextureUpload(renderer: PIXI.WebGLRenderer,
		                baseTexture: PIXI.BaseTexture,
		                glTexture: PIXI.glCore.GLTexture): boolean {
			baseTexture.mipmap = false;

			return true;
		}

		onTextureNew(baseTexture: PIXI.BaseTexture) {
			this.baseTexture = baseTexture;
			baseTexture.width = this.width;
			baseTexture.height = this.height;
			baseTexture.hasLoaded = true;
			baseTexture.height = this.height;
		}

		static create(width: number, height?: number, format: number = WebGLRenderingContext.RGBA) {
			let atlas = new SuperAtlas();
			atlas.width = width;
			atlas.height = height || width;
			atlas.format = format;
			atlas.onTextureNew(new PIXI.BaseTexture());

			return atlas;
		}

		destroy() {
			if (this.baseTexture) {
				this.baseTexture.destroy();
				this.baseTexture = null;
			}
		}
	}
}