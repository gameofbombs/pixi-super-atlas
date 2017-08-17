declare module PIXI {
	interface BaseTexture {
		resource?: pixi_atlas.ITextureResource
		updateID: number;
	}

	interface BaseRenderTexture {
		resource?: pixi_atlas.ITextureResource
		_updateID: number;
	}

	interface TextureManager {
		setStyle(texture: BaseTexture, glTexture: glCore.GLTexture)
	}
}

declare module PIXI.glCore {
	interface GLTexture {
		_updateID: number;
	}
}

namespace pixi_atlas {
	//MIXIN for GLTexture

	(Object as any).assign(PIXI.glCore.GLTexture.prototype, {
		updateID: -1
	});

	(Object as any).assign(PIXI.BaseTexture.prototype, {
		updateID: 0,
		forceUploadStyle: true
	});

	//MIXIN for TextureManager
	function updateTexture(this: PIXI.TextureManager,
	                       texture_: PIXI.BaseTexture | PIXI.Texture,
	                       location?: number): PIXI.glCore.GLTexture {
		const texture = (texture_ as any).baseTexture || texture_ as PIXI.BaseTexture;

		const gl = this.gl;
		const anyThis = this as any;

		const isRenderTexture = !!texture._glRenderTargets;

		if (!texture.hasLoaded) {
			return null;
		}

		const boundTextures = this.renderer.boundTextures;

		// if the location is undefined then this may have been called by n event.
		// this being the case the texture may already be bound to a slot. As a texture can only be bound once
		// we need to find its current location if it exists.
		if (location === undefined) {
			location = 0;

			// TODO maybe we can use texture bound ids later on...
			// check if texture is already bound..
			for (let i = 0; i < boundTextures.length; ++i) {
				if (boundTextures[i] === texture) {
					location = i;
					break;
				}
			}
		}

		boundTextures[location] = texture;

		gl.activeTexture(gl.TEXTURE0 + location);

		let glTexture = texture._glTextures[this.renderer.CONTEXT_UID];

		if (!glTexture) {
			if (isRenderTexture) {
				const renderTarget = new PIXI.RenderTarget(
					this.gl,
					texture.width,
					texture.height,
					texture.scaleMode,
					texture.resolution
				);

				renderTarget.resize(texture.width, texture.height);
				texture._glRenderTargets[this.renderer.CONTEXT_UID] = renderTarget;
				glTexture = renderTarget.texture;
			}
			else {
				glTexture = new PIXI.glCore.GLTexture(this.gl, null, null, null, null);
				glTexture.bind(location);
				glTexture.upload(texture.source);
			}
			texture._glTextures[this.renderer.CONTEXT_UID] = glTexture;

			texture.on('update', this.updateTexture, this);
			texture.on('dispose', this.destroyTexture, this);
		} else if (isRenderTexture) {
			texture._glRenderTargets[this.renderer.CONTEXT_UID].resize(texture.width, texture.height);
		}

		glTexture.premultiplyAlpha = texture.premultipliedAlpha;

		if (!texture.resource ||
			!texture.resource.onTextureUpload(this.renderer, texture, glTexture)) {
			glTexture.uploadData(null, texture.realWidth, texture.realHeight);
		}

		// lets only update what changes..
		if (texture.forceUploadStyle) {
			this.setStyle(texture, glTexture);
		}
		glTexture._updateID = texture._updateID;
	}

	PIXI.TextureManager.prototype.setStyle = function (this: PIXI.TextureManager,
	                                                   texture: PIXI.BaseTexture,
	                                                   glTexture: PIXI.glCore.GLTexture) {
		const gl = this.gl;

		if ((texture as any).isPowerOfTwo) {
			if (texture.mipmap) {
				glTexture.enableMipmap();
			}

			if (texture.wrapMode === PIXI.WRAP_MODES.CLAMP) {
				glTexture.enableWrapClamp();
			}
			else if (texture.wrapMode === PIXI.WRAP_MODES.REPEAT) {
				glTexture.enableWrapRepeat();
			}
			else {
				glTexture.enableWrapMirrorRepeat();
			}
		}
		else {
			glTexture.enableWrapClamp();
		}

		if (texture.scaleMode === PIXI.SCALE_MODES.NEAREST) {
			glTexture.enableNearestScaling();
		}
		else {
			glTexture.enableLinearScaling();
		}
	};

	PIXI.TextureManager.prototype.updateTexture = updateTexture;
}
