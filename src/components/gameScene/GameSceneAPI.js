import { Component } from '../../../libs/Component';


export class GameSceneAPI extends Component {
    get root() {
        return this.controller.rootElement;
    }

    findParentGroup(parentGroup) {
        return this.controller.findParentGroup(parentGroup);
    }

    initUI(ui) {
        this.controller.initUI(ui);
    }

    initSqrtHandler(handler) {
        this.controller.sqrtHandler = handler;
    }
}
