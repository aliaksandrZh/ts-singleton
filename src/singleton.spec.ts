import 'jest';
import { StateManager, ExpandedStateManager } from './singleton.example';

describe('Singleton', () => {
    const instancesLength = 10;

    describe('StateManager', () => {
        it('instance can\'t be created', () => {
            // const sm = new StateManager();
            // throwing error because constructor is private
        });

        it('getInstance returns instance of the class', () => {
            const sm = StateManager.getInstance();
            expect(typeof sm === 'object' && sm instanceof StateManager);
        });

        it('getInstance returns the same instance every time', () => {
            const sm = StateManager.getInstance();
            const instances = [...Array(instancesLength)].map(() => StateManager.getInstance());
            
            instances.forEach(instance => expect(sm).toBe(instance));
        });

        it('state should be shared between instances', () => {
            const sm = StateManager.getInstance();
            const instances = Array(instancesLength).fill(StateManager.getInstance());
        
            instances.forEach(instance => instance.increment());

            instances.forEach(instance => expect(instance.getState()).toEqual(sm.getState()));
            const expectedStateValue = StateManager.InitialValue + (StateManager.IncrementStep * instancesLength);
            expect(sm.getState()).toEqual(expectedStateValue);
        });
    });

    describe('ExpandedStateManager', () => {
        it('instance can be created', () => {
            const esm = new ExpandedStateManager();

            expect(esm instanceof ExpandedStateManager);
        });

        it('incrementStep and initialValue can be defined', () => {
            const options = {
                incrementStep: 5,
                initialValue: 5
            };
            const esm = new ExpandedStateManager(options);

            expect(esm.incrementStep).toEqual(options.incrementStep);
            expect(esm.initialValue).toEqual(options.initialValue);
        });

        it('new operator should create a new instance', () => {
            const instances = [...Array(instancesLength)].map(() => new ExpandedStateManager());

            for (const [index, instance] of instances.entries()) {
                const needToCheck = instances.slice(index + 1);
                needToCheck.forEach(inst => expect(inst).not.toBe(instance));
            }
        });

        it('state should be different', () => {
            const instances = [...Array(instancesLength)].map((_,i: number) => new ExpandedStateManager({
                incrementStep: i + 1,
                initialValue: 0
            }));

            instances.forEach(instance => instance.increment());
            
            for (const [index, instance] of instances.entries()) {
                const expectedState = index + 1;
                expect(instance.getState()).toEqual(expectedState);
            }
        });

        it('getInstance returns the same instance every time', () => {
            const esm = new ExpandedStateManager();
            const instances = [...Array(instancesLength)].map(() => esm.getInstance());
            
            instances.forEach(instance => expect(esm).toBe(instance));
        });

        it('state of instances from getInstance should be shared', () => {
            const esm = new ExpandedStateManager();
            const instances = [...Array(instancesLength)].map(() => esm.getInstance());
           
            instances.forEach(instance => instance.increment());

            instances.forEach(instance => expect(instance.getState()).toEqual(esm.getState()));
            const expectedStateValue = esm.initialValue + (esm.incrementStep * instancesLength);
            expect(esm.getState()).toEqual(expectedStateValue);
        });

        it('getInstance returns the same instance every time', () => {
            const esm1 = new ExpandedStateManager();
            const instances1 = [...Array(instancesLength)].map(() => esm1.getInstance());
            
            const esm2 = new ExpandedStateManager();
            const instances2 = [...Array(instancesLength)].map(() => esm2.getInstance());

            instances1.forEach(instance1 => instances2.forEach(instance2 => expect(instance1).not.toBe(instance2)));
        });
    });

    describe('ExpandedStateManager with restrictions', ()=> {
        const allowedToCreate = 5;
        it('permitted creation of 5 instances', () => {
            const esm = new ExpandedStateManager({ allowedToCreate });
            const instances = [...Array(5)].map(() => esm.getInstance());

            instances.forEach(instance => expect(esm).toBe(instance));
            
            try {
                esm.getInstance();
            } catch (e) {
                const message = (e as Error).message;
                expect(message).toEqual(expect.stringContaining(`Permitted amount: ${allowedToCreate}. Created: ${allowedToCreate + 1}`));
            }
        });
    });
});     