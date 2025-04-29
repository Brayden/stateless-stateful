import { AutoWorker } from "./utils/auto-worker";
import { StatefulObject } from "./utils/do-utils";
import { Env } from "./types"

@AutoWorker<Env>()
export class MyStatefulObject extends StatefulObject<Env> {
    static namespace(request: Request): string {
        return "foobarfinman"
    }

    constructor(ctx: DurableObjectState, env: Env) {
        super(ctx, env);
    }

    async fetch(request: Request): Promise<Response> {
        return new Response(`MyStatefulObject: ${MyStatefulObject.namespace!(request)}`);
    }
}
