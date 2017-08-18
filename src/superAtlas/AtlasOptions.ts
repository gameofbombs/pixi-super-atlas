namespace pixi_atlas {
	export interface IAtlasOptions {
		width ?: number;
		height ?: number;
		loadFactor ?: number;
		repackBeforeResize ?: boolean;
		repackAfterResize ?: boolean;
		maxSize ?: number;
		format ?: number;
		hasAllFields ?: boolean;
	}

	export class AtlasOptions implements IAtlasOptions {
		width = 2048;
		height = 2048;
		loadFactor = 0.95;
		repackBeforeResize = true;
		repackAfterResize = true;
		maxSize = 0;
		format = WebGLRenderingContext.RGBA;

		static MAX_SIZE = 0;

		constructor(src: IAtlasOptions) {
			if (src) {
				this.assign(src);
			}
		}

		assign(src: IAtlasOptions) {
			this.width = src.width || this.width;
			this.height = src.height || src.width || this.height;
			this.maxSize = src.maxSize || AtlasOptions.MAX_SIZE;
			this.format = src.format || this.format;
			this.loadFactor = src.loadFactor || this.loadFactor;
			if (src.repackAfterResize !== undefined) {
				this.repackAfterResize = src.repackAfterResize;
			}
			if (src.repackBeforeResize !== undefined) {
				this.repackBeforeResize = src.repackBeforeResize;
			}
			return this;
		}
	}
}
