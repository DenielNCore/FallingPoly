import * as PIXI from 'pixi.js';


export class Sprite extends PIXI.extras.AnimatedSprite {
    constructor(textures = [PIXI.Texture.EMPTY]) {
        super(textures);

        this.interactive = true;
        this.anchor.set(0.5);
    }
}
