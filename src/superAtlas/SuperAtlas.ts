namespace pixi_atlas {
	const RGBA = WebGLRenderingContext.RGBA;
	import BaseTexture = PIXI.BaseTexture;

	export class SuperAtlasEntry {
		baseTexture: BaseTexture;
		superAtlas: SuperAtlas;
	}

	class Repack implements IRepackResult {
		failed: AtlasEntry[];

		root: AtlasNode<AtlasEntry>;

		hash: { [key: number]: AtlasNode<AtlasEntry> } = {};

		apply() {
			throw new Error("Method not implemented.");
		}
	}

	export class SuperAtlas implements ITextureResource, IAtlas {
		static MAX_SIZE = 2048;

		baseTexture: PIXI.BaseTexture = null;
		format: number = RGBA;
		width: number = 2048;
		height: number = 2048;
		options: AtlasOptions;

		all: Array<AtlasEntry> = [];
		failed: Array<AtlasEntry> = [];
		_atlasRoot = new AtlasNode<AtlasEntry>();

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

		static create(options: IAtlasOptions) {
			let opt = options instanceof AtlasOptions ? options : new AtlasOptions(options);
			let atlas = new SuperAtlas();
			atlas.options = opt;
			atlas.width = opt.width;
			atlas.height = opt.height;
			atlas.format = opt.format;
			atlas.onTextureNew(new PIXI.BaseTexture());

			return atlas;
		}

		destroy() {
			if (this.baseTexture) {
				this.baseTexture.destroy();
				this.baseTexture = null;
			}
		}

		add(texture: BaseTexture | PIXI.Texture, swapCache?: boolean): TextureRegion {
			throw new Error("Method not implemented.");
		}

		addHash(textures: { [key: string]: PIXI.Texture; }, swapCache?: boolean): { [key: string]: TextureRegion; } {
			throw new Error("Method not implemented.");
		}

		private createAtlasRoot() {
			let res = new AtlasNode<AtlasEntry>();
			if (!this.options.algoTreeResize) {
				res.rect.width = this.width;
				res.rect.height = this.height;
			}
			return res;
		}

		repack(failOnFirst: boolean = false): IRepackResult {
			let pack = new Repack();

			let all = this.all.slice(0);
			all.sort((a: AtlasEntry, b: AtlasEntry) => {
				if (b.width == a.width) {
					return b.height - a.height;
				}
				return b.width - a.width;
			});

			let root = this.createAtlasRoot();
			pack.root = root;
			for (let obj of all) {
				let node = root.insert(
					this.width, this.height,
					obj.width, obj.height, obj);
				if (!node) {
					pack.failed.push(obj);
					if (failOnFirst) {
						return pack;
					}
				}
				pack.hash[obj.baseTexture.uid] = node;
			}
			return pack;
		}

		prepare(renderer: PIXI.WebGLRenderer): Promise<void> {
			throw new Error("Method not implemented.");
		}
	}
}