import { Factory } from '../../../libs/Factory';
import { ShapeAPI as component } from './ShapeAPI';
import { ShapeController as Controller } from './ShapeController';
import { ShapeView as View } from './ShapeView';
import { ShapeModel as Model } from './ShapeModel';


component.src = {
    Controller,
    Model,
    View,
};

component.ID = 'shape';

Factory.registerComponents(component);
