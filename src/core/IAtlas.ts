namespace pixi_atlas {
	import BaseTexture = PIXI.BaseTexture;
	import Texture = PIXI.Texture;
	import WebGLRenderer = PIXI.WebGLRenderer;

	interface AtlasEntry {
		baseTexture: BaseTexture;
	}

	interface IRepackResult {
		// goodMap: { [key: string]: AtlasNode<AtlasEntry> };
		failed: Array<AtlasEntry>;

		apply();
	}

	interface IAtlas {
		add(texture: BaseTexture | Texture, swapCache ?: boolean): TextureRegion;

		addHash(textures: { [key: string]: Texture }, swapCache ?: boolean): { [key: string]: TextureRegion };

		repack(): IRepackResult;

		prepare(renderer: WebGLRenderer): Promise<void>;
	}
}
