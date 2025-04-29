import { StatelessObject, fetchFromStatefulObject } from "./utils/do-utils";
import { Env } from "./types"

export class MyStatelessObject extends StatelessObject<Env> {
    constructor() {
        super();
    }

    async fetch(request: Request, ctx: ExecutionContext, env: Env): Promise<Response> {
        return fetchFromStatefulObject(env.MY_STATEFUL_OBJECT, 'default', request);
    }
}
