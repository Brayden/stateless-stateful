import { entrypoint } from "./utils/auto-worker";
import { MyStatefulObject } from "./stateful";
import { MyStatelessObject } from "./stateless";


export default entrypoint(MyStatelessObject);       // <-- Use this for our StatelessObject
// export default entrypoint(MyStatefulObject);     // <-- Use this for our StatefulObject


