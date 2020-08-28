export const CONFIG = {
    'size': {'w' : 800, 'h': 600},
    'gravityLimits': { 'min': 1, 'max': 100 , 'current': 5},
    'fallLimit': 750,

    'spawnFrequency': { 'min': 1, 'max': 10, 'current': 1 },

    'availableTypes': {
        3: {
            'type': 'polygon',
            'attributes': {
                'sides' : { 'min': 3, 'max': 3 },
                'angle' : { 'min': 0, 'max': 360 },
                'radius': { 'min': 40, 'max': 100 },
            },
        },
        4: {
            'type': 'rect',
            'attributes': {
                'width' : { 'min': 40, 'max': 100 },
                'height': { 'min': 40, 'max': 100 }
            },
        },
        5: {
            'type': 'polygon',
            'attributes': {
                'sides' : { 'min': 5, 'max': 5 },
                'angle' : { 'min': 0, 'max': 360 },
                'radius': { 'min': 40, 'max': 100 },
            },
        },
        6: {
            'type': 'polygon',
            'attributes': {
                'sides' : { 'min': 6, 'max': 6 },
                'angle' : { 'min': 0, 'max': 360 },
                'radius': { 'min': 40, 'max': 100 },
            },
        },
        'circle': {
            'type': 'circle',
            'attributes': {
                'radius': { 'min': 40, 'max': 100 },
            },
        },
        'ellipse': {
            'type': 'ellipse',
            'attributes': {
                'width' : { 'min': 40, 'max': 100 },
                'height': { 'min': 40, 'max': 100 }
            },
        },
        'random': {
            'type': 'random',
            'attributes': {
                'sides' : { 'min': 5, 'max': 10 },
                'innerRadius' : { 'min': 20, 'max': 100 },
                'outerRadius': { 'min': 30, 'max': 100 },
            },
        },
    },


    'parentGroups': [
        { 'name': 'MAIN', 'zIndex': 1 },
        { 'name': 'UI', 'zIndex': 10 },
    ],
};