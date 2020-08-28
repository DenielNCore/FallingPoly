import { Controller } from '../../../libs/Controller';
import { View } from '../../../libs/View';
import { Factory } from '../../../libs/Factory';


export class GameSceneController extends Controller {
    constructor(...args) {
        super(...args);

        this.time      = 0;
        this.timeLimit = 1000;

        this.sqrTime      = 0;
        this.sqrTimeLimit = 100;

        this.shapes      = [];
        this.destroyList = [];
    }

    init(...args) {
        super.init(...args);

        this.createParentGroups();

        this.changeColors  = this.changeColors.bind(this);
        this.removeShape   = this.removeShape.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);

        this.initInteractionArea();
    }

    initInteractionArea() {
        this.view.setHitArea(this.model.getHitAreaParams());
        this.view.on('pointerdown', this.onPointerDown);
    }

    initUI(ui) {
        this.ui = ui;

        ui.spawn.decrease.onclick = this.decreaseSpawn.bind(this);
        ui.spawn.increase.onclick = this.increaseSpawn.bind(this);

        ui.speed.decrease.onclick = this.decreaseSpeed.bind(this);
        ui.speed.increase.onclick = this.increaseSpeed.bind(this);

        this.updateSpawnValue();
        this.updateSpeedValue();
    }

    onPointerDown(e) {
        const loc = e.data.getLocalPosition(this.view);

        this.createShape(loc);
    }

    updateTotalCount() {
        this.ui.counter.textContent = `${this.shapes.length} shapes`;
    }

    updateTotalSqrt() {
        this.ui.surface.textContent = `${this.model.sqrt} px^2`;
    }

    decreaseSpawn() {
        const { min, current } = this.model.spawnFrequency;

        if (current <= min) return;
        this.model.spawnFrequency.current--;

        this.updateSpawnValue();
    }

    increaseSpawn() {
        const { max, current } = this.model.spawnFrequency;

        if (current >= max) return;
        this.model.spawnFrequency.current++;

        this.updateSpawnValue();
    }

    updateSpawnValue() {
        this.ui.spawn.value.textContent = `${this.model.spawnFrequency.current} shapes per sec`;
    }

    decreaseSpeed() {
        const { min, current } = this.model.gravityLimits;

        if (current <= min) return;
        this.model.gravityLimits.current--;

        this.updateSpeedValue();
    }

    increaseSpeed() {
        const { max, current } = this.model.gravityLimits;

        if (current >= max) return;
        this.model.gravityLimits.current++;

        this.updateSpeedValue();
    }

    updateSpeedValue() {
        this.ui.speed.value.textContent = `Gravity Value: ${this.model.gravityLimits.current}`;
    }

    createParentGroups() {
        this.model.parentGroups.forEach(group => {
            const container       = new View();
            container.zIndex      = group.zIndex;
            container.parentGroup = group.name;

            this.rootElement.addChild(container);
        });
    }

    findParentGroup(parentGroup = 'MAIN') {
        return this.displayGroups.find(group => group.parentGroup === parentGroup);
    }

    get displayGroups() {
        return this.view.children;
    }

    get rootElement() {
        return this.view;
    }

    generateShapes() {
        for (let i = 0; i < this.model.spawnFrequency.current; i++) {
            this.createShape();
        }
    }

    createShape(pos) {
        const component = Factory.createComponent({ ID: 'shape', 'parentGroup': 'MAIN' });
        component.on('change', this.changeColors);
        component.on('destroy', this.removeShape);
        if(pos) component.setPosition(pos);
        this.shapes.push(component);
    }

    changeColors(type) {
        this.shapes.filter(shape => shape.type === type)
            .forEach(shape => shape.changeColor());
    }

    removeShape(index) {
        const shape = this.shapes.find(shape => shape.registerIndex === index);

        this.destroyList.push(shape);
    }

    collectDestroyed() {
        this.destroyList.forEach(shape => {
            const id = this.shapes.indexOf(shape);
            this.shapes.splice(id, 1);
            shape.off('change', this.changeColors);
            shape.off('destroy', this.removeShape);
            shape.destroy();
        });

        this.destroyList = [];
    }

    fallShapesDown(delta) {
        const speed = this.model.gravityLimits.current * delta / this.model.speedCoef;
        this.shapes.forEach(shape => {
            shape.fall(speed);
        });
    }

    updateSquareValue(delta) {
        if (this.sqrTime < this.sqrTimeLimit) {
            this.sqrTime += delta;
        } else {
            this.sqrTime -= this.sqrTimeLimit;
            this.model.sqrt = this.sqrtHandler();
            this.updateTotalSqrt();
        }
    }

    updateSpawnTimer(delta) {
        if (this.time < this.timeLimit) {
            this.time += delta;
        } else {
            this.time -= this.timeLimit;
            this.generateShapes();
        }
    }

    tick(delta) {
        this.updateSpawnTimer(delta);
        this.updateSquareValue(delta);
        this.fallShapesDown(delta);
        this.updateTotalCount();

        this.collectDestroyed();
    }
}
