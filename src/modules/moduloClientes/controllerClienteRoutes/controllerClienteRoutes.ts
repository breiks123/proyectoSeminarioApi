import { Request, Response } from "express";
import sha1 from "sha1";
import isEmpty from "is-empty";
import path from "path";
import { ISimpleCliente,ICliente, } from "../models/Cliente";
import BusinessCliente from "../businessClienteController/BusinessCliente";
class ClienteRoutesController {
    constructor() {

    }
    //funciones para gestionar clientes //ARIEL

    public async createCliente(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        var clienteData = request.body;
        clienteData["registerdate"] = new Date();
        clienteData["idVendedor"] = request.params.id;
        let result = await cliente.addCliente(clienteData);
        response.status(201).json({ serverResponse: result });
    }
    public async getClientes(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        const result: Array<ICliente> = await cliente.readAllClientes();
        response.status(200).json({ serverResponse: result });
    }
    public async updateCliente(request: Request, response: Response) {
        var cliente: BusinessCliente = new BusinessCliente();
        let id: string = request.params.id;
        var params = request.body;
        var result = await cliente.updateCliente(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getClientesByVendedor(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readClientesByVendedor(id);
        response.status(200).json({ serverResponse: result });
    }
    public  async getClientesById(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result = await cliente.readCliente(id);
        response.status(200).json({ serverResponse: result });
    }
    public async removeClientes(request: Request, response: Response) {
        var cliente:BusinessCliente = new BusinessCliente();
        let id: string = request.params.id;
        let result = await cliente.deleteCliente(id);
        response.status(200).json({ serverResponse: result });
    }


    //fuciones para  clientes potenciales y regulares

    public  async getClientesRegularesByVendedor(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readAllRegularClientesByVendedor(id);
        response.status(200).json({ serverResponse: result });
    }


    public  async getClientesPotencialesByVendedor(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readAllPotencialClientesByVendedor(id);
        response.status(200).json({ serverResponse: result });
    }

    public  async getClientesPotenciales(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readAllPotencialClientes();
        response.status(200).json({ serverResponse: result });
    }

    public  async getClientesRegulares(request: Request, response:Response)
    {
        var cliente : BusinessCliente = new BusinessCliente();
        let id:string = request.params.id;
        var result:Array<ICliente>= await cliente.readAllRegularClientes();
        response.status(200).json({ serverResponse: result });
    }

    //funciones para subir imagen del cliente(tienda) //ARIEL
    
    public async uploadImagenCliente(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "El id es necesario para subir una foto" });
          return;
        }
        var cliente: BusinessCliente = new BusinessCliente();
        var clienteToUpdate: ICliente = await cliente.readCliente(id);
        if (!clienteToUpdate) {
          response.status(301).json({ serverResponse: "El cliente no existe!" });
          return;
        }
        
        if (isEmpty(request.files)) {
          response
            .status(302)
            .json({ serverResponse: "No existe un archivo adjunto" });
          return;
        }
        var dir = `${__dirname}/../../../../clientesImages`;
        var absolutepath = path.resolve(dir);
        var files: any = request.files;
        /*var file: any = files.portrait;
        if (!file) {
          response.status(300).json({
            serverResponse:
              "error el archivo debe ser subido con el parametro portrait!",
          });
          return;
        }*/
        var key: Array<string> = Object.keys(files);
        /**/
        var copyDirectory = (totalpath: string, file: any) => {
          return new Promise((resolve, reject) => {
            file.mv(totalpath, (err: any, success: any) => {
              if (err) {
                resolve(false);
                return;
              }
              resolve(true);
              return;
            });
          });
        };
        for (var i = 0; i < key.length; i++) {
          var file: any = files[key[i]];
          var filehash: string = sha1(new Date().toString()).substr(0, 7);
          var newname: string = `${filehash}_${file.name}`;
          var totalpath = `${absolutepath}/${newname}`;
          await copyDirectory(totalpath, file);
          clienteToUpdate.uriavatar = "/api/getImagenCliente/" + id;
          clienteToUpdate.pathavatar = totalpath;
          var clienteResult: ICliente = await clienteToUpdate.save();
        }
        var simpleCliente: ISimpleCliente = {
    nombre:clienteResult.nombre,
    apellidos:clienteResult.apellidos,
    email:clienteResult.email,
    telefono:clienteResult.nombre,
    ci:clienteResult.ci,
    uriavatar:clienteResult.uriavatar,
    pathavatar:clienteResult.pathavatar,
  
        };
        response.status(200).json({ serverResponse: simpleCliente});
        /*file.mv(totalpath, async (err: any, success: any) => {
          if (err) {
            response
              .status(300)
              .json({ serverResponse: "No se pudo almacenar el archivo" });
            return;
          }
          userToUpdate.uriavatar = "/api/getportrait/" + id;
          userToUpdate.pathavatar = totalpath;
          var userResult: IUser = await userToUpdate.save();
          var simpleUser: ISimpleUser = {
            username: userResult.username,
            uriavatar: userResult.uriavatar,
            pathavatar: userResult.pathavatar,
          };
          response.status(300).json({ serverResponse: simpleUser });
        });*/
      }
  
      //obtener imagen de ususario //ARIEL
      public async getImagenCliente(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
          response
            .status(300)
            .json({ serverResponse: "Identificador no encontrado" });
          return;
        }
        var cliente: BusinessCliente = new BusinessCliente();
        var clienteData: ICliente = await cliente.readCliente(id);
        if (!clienteData) {
          response.status(300).json({ serverResponse: "Error " });
          return;
        }
        if (clienteData.pathavatar == null) {
          response.status(301).json({ serverResponse: "No existe la imagen " });
          return;
        }
        response.sendFile(clienteData.pathavatar);
      }
}
export default ClienteRoutesController;