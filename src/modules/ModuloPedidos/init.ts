import { Express } from "express";
import RoutesPedidosProductosModule from "./routesPedidos-ProductosModule";
class ModuloPedidos {
    private routes: RoutesPedidosProductosModule;
    constructor(root: string, app: Express) {
        console.log("Init pedidos module");
        this.routes = new RoutesPedidosProductosModule(root, app);

    }
}
export default ModuloPedidos;