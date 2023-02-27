enum DecorSymbol {
    Tree = 'Arbre',
    Rock = 'Rocher',
    Water = 'Eau',
    Bridge = 'Pont',
    Ground = 'Sol',
}

class DecorType {
    symbol: DecorSymbol;
    traversable: boolean;

    constructor(symbol: DecorSymbol, traversable: boolean) {
        this.symbol = symbol;
        this.traversable = traversable;
    }

    createInstance(position: { x: number; y: number }): Decor {
        const instance = new Decor();
        instance.traversable = this.traversable;
        instance.symbol = this.symbol;
        instance.position = position;
        return instance;
    }
}

class Blocking extends DecorType {
    constructor(type: DecorSymbol) {
        super(type, false);
    }
}

class NonBlocking extends DecorType {
    constructor(type: DecorSymbol) {
        super(type, true);
    }
}

export class DecorFactory {
    public createInstance(position: { x: number; y: number }): Decor {
        const blockingTypes = [DecorSymbol.Tree, DecorSymbol.Rock, DecorSymbol.Water];
        const nonBlockingTypes = [DecorSymbol.Bridge, DecorSymbol.Ground];
        const blocking = Math.random() < 0.5;
        const tempType = blocking
            ? blockingTypes[Math.floor(Math.random() * blockingTypes.length)]
            : nonBlockingTypes[Math.floor(Math.random() * nonBlockingTypes.length)];

        switch (tempType) {
            case DecorSymbol.Tree:
                return new Blocking(DecorSymbol.Tree).createInstance(position);
            case DecorSymbol.Rock:
                return new Blocking(DecorSymbol.Rock).createInstance(position);
            case DecorSymbol.Water:
                return new Blocking(DecorSymbol.Water).createInstance(position);
            case DecorSymbol.Bridge:
                return new NonBlocking(DecorSymbol.Bridge).createInstance(position);
            case DecorSymbol.Ground:
                return new NonBlocking(DecorSymbol.Ground).createInstance(position);
        }
    }
}

export class Decor {
    position!: { x: number; y: number };
    traversable: boolean = false;
    symbol!: DecorSymbol;
}
