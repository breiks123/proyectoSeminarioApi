import ClienteRoutesController from "./controllerClienteRoutes/controllerClienteRoutes"
//import jsonwebtokenSecurity from "./middleware";
import ReunionesRoutesController from "./controllerClienteRoutes/controladorReunionesRoutes";
import { Express } from "express";
class RoutesCliente {
    private routesController: ClienteRoutesController;
    private routesControllerReuniones:ReunionesRoutesController;
    private routeparent: string;
    constructor(routeparent: string, app: Express) {
        this.routesController = new ClienteRoutesController();
        this.routesControllerReuniones = new ReunionesRoutesController();
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express) {
        //rutas para clientes //ARIEL
        app.route(`${this.routeparent}/clientes/:id`).post(this.routesController.createCliente);
        
        app.route(`${this.routeparent}/clientes`).get(this.routesController.getClientes);
        app.route(`${this.routeparent}/clientes/:id`).put(this.routesController.updateCliente);
        app.route(`${this.routeparent}/clientes/:id`).delete(this.routesController.removeClientes);
        app.route(`${this.routeparent}/clientesVendedor/:id`).get(this.routesController.getClientesByVendedor);
        app.route(`${this.routeparent}/cliente/:id`).get(this.routesController.getClientesById);
            app
            .route(`${this.routeparent}/uploadImagenCliente/:id`)
            .post(this.routesController.uploadImagenCliente);
            app
            .route(`${this.routeparent}/getImagenCliente/:id`)
            .get(this.routesController.getImagenCliente);
        //RUTAS PARA REUNIONES //HORACIO
        app.route(`${this.routeparent}/reuniones/:clienteId/:vendedorId`).post(this.routesControllerReuniones.createReunion);
        app.route(`${this.routeparent}/reuniones`).get(this.routesControllerReuniones.getReuniones);
        app.route(`${this.routeparent}/reuniones/:id`).put(this.routesControllerReuniones.updateReunion);
        app.route(`${this.routeparent}/reuniones/:id`).delete(this.routesControllerReuniones.removeReunion);
        app.route(`${this.routeparent}/reunionesVendedor/:vendedorId`).get(this.routesControllerReuniones.getReunionesByVendedor);
        app.route(`${this.routeparent}/reunion/:id`).get(this.routesControllerReuniones.getReunionById);
                
    }
}
export default RoutesCliente;