import * as PIXI from 'pixi.js';
import { Model } from '../../../libs/Model';
import { CONFIG } from '../../../CONFIG';


export class ShapeModel extends Model {
    #params;
    #fallLimit;

    constructor(...args) {
        super(...args);
        this.TYPES_MAP  = Object.assign({}, CONFIG.availableTypes);
        this.#fallLimit = CONFIG.fallLimit;
    }

    get fallLimit() {
        return this.#fallLimit;
    }

    get shape() {
        const list = Object.keys(this.TYPES_MAP);
        return list[Math.floor(Math.random() * Math.floor(list.length))];
    }

    get color() {
        return PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    get start() {
        return {
            x: this.getRandomInt(50, CONFIG.size.w - 100),
            y: -100,
        };
    }

    get params() {
        if (this.#params) return this.#params;

        const shape                = this.shape;
        const { attributes, type } = this.TYPES_MAP[shape];

        const params = {
            shape,
            type,
            start: this.start,
            color: this.color,
        };

        Object.entries(attributes)
            .forEach(([name, value]) => {
                const { min, max } = value;
                Object.assign(params, { [name]: this.getRandomInt(min, max) });
            });

        Object.assign(params, this.getPath(params));

        this.params = params;
        return params;
    }

    set params(params) {
        this.#params = params;
    }

    get shapeType() {
        return this.params.shape;
    }

    getPath({ sides, radius }) {
        if (!sides) return [];

        const path = [];
        let step   = (Math.PI * 2) / sides;
        let start  = 0;
        let n, dx, dy;

        path.push(new PIXI.Point(Math.cos(start) * radius, -(Math.sin(start) * radius)));

        for (n = 1; n <= sides; ++n) {
            dx = Math.cos(start + (step * n)) * radius;
            dy = -Math.sin(start + (step * n)) * radius;
            path.push(new PIXI.Point(dx, dy));
        }

        return { path };
    }
}
