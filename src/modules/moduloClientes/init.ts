import { Express } from "express";
import RoutesClienteModule from "./routesClienteModule";
class ModuloCliente {
    private routes: RoutesClienteModule;
    constructor(root: string, app: Express) {
        console.log("Init cliente module");
        this.routes = new RoutesClienteModule(root, app);

    }
}
export default ModuloCliente;