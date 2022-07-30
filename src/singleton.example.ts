export class StateManager {
    public static InitialValue = 0;
    public static IncrementStep = 1;
    private static _instance: StateManager;

    private state = StateManager.InitialValue;

    private constructor(){}

    public static getInstance(): StateManager {
        if(StateManager._instance == null) {
            StateManager._instance = new StateManager();
        }

        return StateManager._instance;
    }

    public increment(): void {
        this.state += StateManager.IncrementStep;
    }

    public getState(): number { 
        return this.state;
    }
}


interface ExpandedStateManagerOptions {
    initialValue: number;
    incrementStep: number;
    allowedToCreate: number;
}

type ExpandedStateManagerNullableOptions = Partial<ExpandedStateManagerOptions>;

export class ExpandedStateManager {
    private _initialValue = 0;
    private _incrementStep = 1;
    private _instance: ExpandedStateManager;

    private state = 0;
    private isCreationRestricted = false;
    private allowedToCreate = 0;
    private alreadyCreated = 0;

    public constructor(options: ExpandedStateManagerNullableOptions = {}){ 
        this._initialValue = options.initialValue || this._initialValue;
        this._incrementStep = options.incrementStep || this._incrementStep;
        this.isCreationRestricted = options.allowedToCreate ? true : false;
        this.allowedToCreate = options.allowedToCreate || 0;

        this.state = this._initialValue;
        this._instance = this;
    }

    public get initialValue(): number {
        return this._initialValue;
    }

    public get incrementStep(): number {
        return this._incrementStep;
    }

    public getInstance(): ExpandedStateManager {
        if (!this.isCreationRestricted) {
            return this._instance;
        }

        this.alreadyCreated += 1;

        if (this.allowedToCreate >= this.alreadyCreated) {
            return this._instance;
        }

        throw Error(`Creation of the new Instance is restricted. Permitted amount: ${this.allowedToCreate}. Created: ${this.alreadyCreated}`);
    }

    public increment(): void {
        this.state += this._incrementStep;
    }

    public getState(): number { 
        return this.state;
    }
}
