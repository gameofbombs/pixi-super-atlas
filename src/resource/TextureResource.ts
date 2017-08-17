namespace pixi_atlas {
	export interface ITextureResource {
		onTextureUpload(renderer: PIXI.WebGLRenderer, baseTexture: PIXI.BaseTexture, glTexture: PIXI.glCore.GLTexture): boolean;

		onTextureTag?(baseTexture: PIXI.BaseTexture): void;

		onTextureNew?(baseTexture: PIXI.BaseTexture): void;

		onTextureDestroy?(baseTexture: PIXI.BaseTexture): boolean;
	}
}
