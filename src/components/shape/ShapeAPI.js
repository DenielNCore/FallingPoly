import { Component } from '../../../libs/Component';


export class ShapeAPI extends Component {
    fall(gravity) {
        this.controller.fall(gravity);
    }

    on(...args) {
        this.controller.on(...args);
    }

    once(...args) {
        this.controller.once(...args);
    }

    off(...args) {
        this.controller.off(...args);
    }

    changeColor() {
        this.controller.changeColor();
    }

    destroy() {
        this.controller.destroy();
    }

    get surface() {
        return this.controller.surface;
    }

    get type() {
        return this.controller.type;
    }
}
