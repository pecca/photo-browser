import { createAction } from "./utils";

describe("utils tests", () => {

  it("Creates action with or without payload", () => {
    const actionWithoutPayload = () => createAction("WITHOUT_PAYLOAD");
    expect(actionWithoutPayload()).toEqual({type: "WITHOUT_PAYLOAD"});
    // tslint:disable-next-line:no-any
    const actionWithPayload = (payload: any) => createAction("WITH_PAYLOAD", payload);
    expect(actionWithPayload("heavy payload")).toEqual({payload: "heavy payload", type: "WITH_PAYLOAD"});
  });

  it("Returns only the type for undefined payload", () => {
    const undefinedPayloadAction = (payload: undefined) => createAction("UNDEFINED_PAYLOAD", payload);
    expect(undefinedPayloadAction(undefined)).toEqual({type: "UNDEFINED_PAYLOAD"});
  });

  it("Accepts falsy payloads that are not undefined", () => {
    const validFalsyAction = (payload: string | number | boolean | null) => createAction("VALID_FALSY", payload);
    expect(validFalsyAction("")).toEqual({payload: "", type: "VALID_FALSY"});
    expect(validFalsyAction(0)).toEqual({payload: 0, type: "VALID_FALSY"});
    expect(validFalsyAction(false)).toEqual({payload: false, type: "VALID_FALSY"});
    expect(validFalsyAction(null)).toEqual({payload: null, type: "VALID_FALSY"});
  });

});
