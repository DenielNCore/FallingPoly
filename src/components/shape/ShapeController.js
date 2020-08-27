import { Controller } from '../../../libs/Controller';


export class ShapeController extends Controller {
    init(model, view) {
        this.model = model;
        this.view  = view;

        this.view.onPointerDown = () => {
            this.view.emit('change', this.model.shapeType);
        };

        view.init(this.model.params);
    }

    changeColor() {
        this.view.setColor({ ...this.model.params, color: this.model.color });
    }

    fall(speed) {
        this.view.y += speed;
        if (this.view.y >= this.model.fallLimit) this.view.emit('destroy', this.registerIndex);
    }

    on(...args) {
        this.view.on(...args);
    }

    once(...args) {
        this.view.once(...args);
    }

    off(...args) {
        this.view.off(...args);
    }

    get type() {
        return this.model.shapeType;
    }

    get surface() {
        return this.model.surface;
    }

    destroy() {
        this.view.destroy();

        this.model = null;
        this.view  = null;
    }
}
