import { Game } from '../src/Game';


export class Factory {
    static components   = {};
    static counterIndex = 0;

    static registerComponents = (component) => {
        const { ID }           = component;
        Factory.components[ID] = component;
    };

    static createComponent = (options) => {
        const { ID } = options;

        const component = new Factory.components[ID](ID);
        component.init(options);

        component.registerIndex = Factory.counterIndex++;

        return component;
    };

    static getContainer(parentGroup) {
        return Game.currentWindow.findParentGroup(parentGroup);
    }
}