
import ProductosRoutesController from "./controllersPedidosRoutes/ControladorProductosRoutes"
import PedidosRoutesController from "./controllersPedidosRoutes/ControladorPedidosRoutes";
//import jsonwebtokenSecurity from "./middleware";
import { Express } from "express";
class RoutesPedidos {
    private routesControllerProductos: ProductosRoutesController;
    private routesControllerPedidos: PedidosRoutesController;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.routesControllerProductos = new ProductosRoutesController();
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express) {
        //rutas para Productos //HORACIO
        app.route(`${this.routeparent}/productos`).post(this.routesControllerProductos.createProducto);
        
        app.route(`${this.routeparent}/productos`).get(this.routesControllerProductos.getProductos);
        app.route(`${this.routeparent}/productos/:id`).put(this.routesControllerProductos.updateProducto);
        app.route(`${this.routeparent}/productos/:id`).delete(this.routesControllerProductos.removeProductos);
        app.route(`${this.routeparent}/productosCategorias/:id`).get(this.routesControllerProductos.getProductosByCategoria);
        app.route(`${this.routeparent}/producto/:id`).get(this.routesControllerProductos.getProductosById);
            app
            .route(`${this.routeparent}/uploadImagenProducto/:id`)
            .post(this.routesControllerProductos.uploadImagenProducto);
            app
            .route(`${this.routeparent}/getImagenProducto/:id`)
            .get(this.routesControllerProductos.getImagenProducto);  
        //rutas para Pedidos //PAOLA     
        app.route(`${this.routeparent}/pedidos`).post(this.routesControllerPedidos.createPedido);
        
        app.route(`${this.routeparent}/pedidos`).get(this.routesControllerPedidos.getPedidos);
        app.route(`${this.routeparent}/pedidos/:id`).put(this.routesControllerPedidos.updatePedido);
        app.route(`${this.routeparent}/pedidos/:id`).delete(this.routesControllerPedidos.removePedidos);
        app.route(`${this.routeparent}/pedidosVendedor/:id`).get(this.routesControllerPedidos.getPedidosByVendedor);
        app.route(`${this.routeparent}/pedido/:id`).get(this.routesControllerPedidos.getPedidosById);  
    }
}
export default RoutesPedidos;