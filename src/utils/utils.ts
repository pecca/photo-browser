import * as _ from "lodash";

// tslint:disable-next-line:no-any
type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };
type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

interface Action<T extends string> { type: T; }
interface ActionWithPayload<T extends string, P> extends Action<T> { payload: P; }

function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
function createAction<T extends string, P>(type: T, payload?: P) {
  return payload !== undefined ? { type, payload } : { type };
}

export function getMockActions<TypeOfActions>(actions: TypeOfActions): TypeOfActions {
  const mockActions: TypeOfActions = _.cloneDeep(actions);
  Object.keys(mockActions).forEach(key => mockActions[key] = jest.fn());
  return mockActions;
}

export { createAction, ActionsUnion };
