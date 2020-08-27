import * as PIXI from 'pixi.js';
import { Factory } from '/libs/Factory';
import { CONFIG } from '../CONFIG.js';
import { UI } from './UI';


const Game = {};

Game.container     = null;
Game.size          = { w: CONFIG.size.w, h: CONFIG.size.h };
Game.app           = null;
Game.currentWindow = null;
Game.soundOn       = false;
Game.observer      = null;
Game.ui            = null;
Game.factory       = null;
Game.squareHelper  = null;

Game.init = container => {
    Game.container = container || document.body;

    const app = new PIXI.Application(Game.size.w, Game.size.h,
        { transparent: true, backgroundColor: 0x330000, forceCanvas: true });
    Game.container.appendChild(app.view);

    app.view.addEventListener('mousedown', function () {
        Game.soundOn = true;
        Game.emit('interaction');
    }, false);

    app.view.addEventListener('touchstart', function () {
        Game.soundOn = true;
        Game.emit('interaction');
    }, false);

    Game.app = app;

    Game.observer = new PIXI.utils.EventEmitter();

    Game.factory = Factory;

    const ui = new UI();
    ui.init();

    app.ticker.add(Game.tick);

    Game.showWindow(Factory.createComponent({ ID: 'GameScene' }));

    Game.currentWindow.initUI(ui);
    Game.currentWindow.initSqrtHandler(Game.addSquareHelper);
};

Game.showWindow = (w) => {
    Game.currentWindow = w;

    Game.app.stage.addChildAt(w.root, 0);
};

Game.addSquareHelper = () => {
    let cleared = 0;
    const { width, height } = Game.app.view;
    const data = Game.app.view.getContext('2d')
        .getImageData(0, 0, width, height).data;

    const total = data.length / 4;

    for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) {
            cleared++;
        }
    }

    return Math.sqrt(total - cleared);
};

Game.emit = (event, a1, a2, a3, a4) => {
    Game.observer.emit(event, a1, a2, a3, a4);
    Game.observer.emit('gameEvent', { type: event, data: a1 });
};

Game.on = (event, fn, context) => {
    Game.observer.on(event, fn, context);
};

Game.once = (event, fn, context) => {
    Game.observer.once(event, fn, context);
};

Game.off = (event, fn, context) => {
    Game.observer.off(event, fn, context);
};

Game.tick = () => {
    const delta = PIXI.ticker.shared.elapsedMS;

    if (Game.currentWindow && Game.currentWindow.tick) {
        Game.currentWindow.tick(delta);
    }

    Game.emit('tick', delta);
};

export { Game };
