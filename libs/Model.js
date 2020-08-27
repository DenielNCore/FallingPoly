export class Model {
    constructor(options) {
        Object.entries(options)
            .forEach(([name, value]) => {
                    this[name] = value;
                },
            );
    }
}