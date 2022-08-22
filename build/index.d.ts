import OrdsRunner from "./lib/ordsRunner";
import OrdsQueryBuilder from "./lib/ordsQueryBuilder";
declare const ords: {
    runner: typeof OrdsRunner;
    builder: typeof OrdsQueryBuilder;
};
export default ords;
