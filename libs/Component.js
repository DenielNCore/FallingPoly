import { Factory } from './Factory';


export class Component {

    #name;
    #regIndex;
    #controller;

    constructor(ID) {
        this.#name       = ID;
        this.#controller = null;
    }

    init(options) {
        const component = Factory.components[this.name];

        const controller = new component.src.Controller();
        this.controller  = controller;

        const view       = new component.src.View();
        view.parentGroup = options.parentGroup;

        const model = new component.src.Model(options);

        controller.init(model, view);
    }

    set controller(controller) {
        if (this.#controller) {
            throw new Error(`Component ${this.name} controller already added!`);
        }

        this.#controller = controller;
    }

    get controller() {
        return this.#controller;
    }

    get name() {
        return this.#name;
    }

    tick(delta) {
        this.controller.tick(delta);
    }

    set registerIndex(index) {
        this.#regIndex                = index;
        this.controller.registerIndex = index;
    }

    get registerIndex() {
        return this.#regIndex;
    }
}