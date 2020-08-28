import { Model } from '../../../libs/Model';
import { CONFIG } from '../../../CONFIG';


export class GameSceneModel extends Model {
    #parentGroups;
    #sqrt;

    constructor(...args) {

        super(...args);

        this.#parentGroups = [
            ...CONFIG.parentGroups,
        ];

        this.screenParams = Object.assign({}, CONFIG.size);

        this.#sqrt = 0;

        this.spawnFrequency = Object.assign({}, CONFIG.spawnFrequency);
        this.gravityLimits  = Object.assign({}, CONFIG.gravityLimits);
        this.speedCoef      = 100;
    }

    get parentGroups() {
        return this.#parentGroups;
    }

    get sqrt() {
        return this.#sqrt;
    }

    set sqrt(sqrt) {
        this.#sqrt = sqrt.toFixed(2);
    }

    getHitAreaParams() {
        return {
            ...this.screenParams,
            type: 'rect',
        };
    }
}
