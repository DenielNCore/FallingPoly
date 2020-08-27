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
}