import { Sprite } from './Sprite';
import { Factory } from './Factory';


export class View extends Sprite {
    init() {
        Factory.getContainer(this.parentGroup)
            .addChild(this);
    }

    destroy() {
        Factory.getContainer(this.parentGroup)
            .removeChild(this);
    }

    setHitArea(params) {
        const { type, w, h, r, path } = params;
        switch (type) {
            case 'circle':
                this.hitArea = new PIXI.Circle(0, 0, r);
                break;
            case 'ellipse':
                this.hitArea = new PIXI.Ellipse(0, 0, w, h);
                break;
            case 'polygon' :
                this.hitArea = new PIXI.Polygon(path);
                break;
            case 'rect' :
                this.hitArea = new PIXI.Rectangle(0, 0, w, h);
                break;
            default:
                throw new Error('No hitArea TYPE!!');
        }
    }
}