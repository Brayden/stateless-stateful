import { DurableObject } from "cloudflare:workers";

abstract class StatelessObject<T> {
    abstract fetch(request: Request, ctx: ExecutionContext, env: T): Promise<Response>;
}

// Extend StatefulObject to handle initialization
export abstract class ExtendedStatefulObject<E> extends DurableObject<E> {
    protected sql: SqlStorage;

    constructor(ctx: DurableObjectState, env: E) {
        super(ctx, env);
        this.sql = ctx.storage.sql;
    }

    async fetch(request: Request): Promise<Response> {
        throw new Error('fetch() must be implemented in derived class');
    }
}

export { ExtendedStatefulObject as StatefulObject, StatelessObject };

export function fetchFromStatefulObject<T>(
    namespace: DurableObjectNamespace,
    name: string = 'default',
    request: Request
): Promise<Response> {
    const stubId = namespace.idFromName(name);
    const stub = namespace.get(stubId);
    return stub.fetch(request);
}

export const entrypoint = (WorkerClass: new () => StatelessObject<any>) => ({
    async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
        const worker = new WorkerClass();
        return worker.fetch(request, ctx, env);
    }
}); 