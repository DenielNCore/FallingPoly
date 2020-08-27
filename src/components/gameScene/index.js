import { Factory } from '../../../libs/Factory';
import { GameSceneAPI as component } from './GameSceneAPI';
import { GameSceneController as Controller } from './GameSceneController';
import { GameSceneView as View } from './GameSceneView';
import { GameSceneModel as Model } from './GameSceneModel';


component.src = {
    Controller,
    Model,
    View,
};

component.ID = 'GameScene';

Factory.registerComponents(component);
