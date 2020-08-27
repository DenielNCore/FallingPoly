import * as PIXI from 'pixi.js';
import { View } from '../../../libs/View';


export class ShapeView extends View {
    #sprite;

    init(params) {
        const { start } = params;
        super.init();
        this.createGraphics(params);
        this.position = start;

        this.on('pointerdown', this.onPointerDown);
    }

    destroy() {
        this.off('pointerdown', this.onPointerDown);
        super.destroy();
    }

    setColor(params) {
        const { color } = params;

        this.sprite.clear();
        this.sprite.beginFill(color);
        this.addDrawer(this.sprite, params);
        this.sprite.endFill();
    }

    addDrawer(graphics, params) {
        const { type, radius, width, height, path } = params;

        switch (type) {
            case 'circle':
                graphics.drawCircle(0, 0, radius);
                break;
            case 'ellipse':
                graphics.drawEllipse(0, 0, width, height);
                break;
            case 'polygon' :
                graphics.drawPolygon(path);
                break;
            case 'rect' :
                graphics.drawRect(0, 0, width, height);
                break;
            default:
                throw new Error('No shape TYPE generated!!');
        }
    }

    createGraphics(params) {
        const { color } = params;
        const graphics  = new PIXI.Graphics();

        graphics.beginFill(color);

        this.addDrawer(graphics, params);

        graphics.endFill();
        graphics.interactive = true;

        this.sprite = graphics;
        this.addChild(graphics);
    }

    get sprite() {
        return this.#sprite;
    }

    set sprite(sprite) {
        this.#sprite = sprite;
    }
}
