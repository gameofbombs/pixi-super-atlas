namespace pixi_atlas {
	import BaseTexture = PIXI.BaseTexture;
	import Texture = PIXI.Texture;
	import WebGLRenderer = PIXI.WebGLRenderer;

	export interface AtlasEntry {
		baseTexture: BaseTexture;
		atlas: IAtlas;
		currentNode: AtlasNode<AtlasEntry>;
		currentAtlas: SuperAtlas;
		width: number;
		height: number;
	}

	export interface IRepackResult {
		// goodMap: { [key: string]: AtlasNode<AtlasEntry> };
		failed: Array<AtlasEntry>;

		apply();
	}

	export interface IAtlas {
		add(texture: BaseTexture | Texture, swapCache ?: boolean): TextureRegion;

		addHash(textures: { [key: string]: Texture }, swapCache ?: boolean): { [key: string]: TextureRegion };

		repack(): IRepackResult;

		prepare(renderer: WebGLRenderer): Promise<void>;
	}
}
