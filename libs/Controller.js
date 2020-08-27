import * as PIXI from 'pixi.js';


export class Controller {

    #regIndex;
    #model;
    #view;

    constructor() {
        this.#model = null;
        this.#view  = null;

        this.observer = new PIXI.utils.EventEmitter();
    }

    init(model, view) {
        this.model = model;
        this.view  = view;
        view.init();
    }

    set view(view) {
        if (this.#view) {
            this.#view = null;
        }
        if (view) {
            this.#view = view;
        }
    }

    get view() {
        return this.#view;
    }

    set model(model) {
        this.#model = model;
    }

    get model() {
        return this.#model;
    }

    emit(event, a1, ...args) {
        this.observer.emit(...args);
        this.observer.emit('gameEvent', { type: event, data: a1 });//??
    }

    on(...args) {
        this.observer.on(...args);
    };

    once(...args) {
        this.observer.once(...args);
    };

    off(event, fn, context) {
        this.observer.off(event, fn, context);
    };

    tick(delta) {
    }

    set registerIndex(index) {
        this.#regIndex = index;
    }

    get registerIndex() {
        return this.#regIndex;
    }
}