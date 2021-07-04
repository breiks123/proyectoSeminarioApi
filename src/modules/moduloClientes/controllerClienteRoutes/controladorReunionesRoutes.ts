//HORACIO
import { Request, Response } from "express";
import sha1 from "sha1";
import { IReunion } from "../models/Reuniones";
import BusinessReunion from "../businessClienteController/BusinnesReuniones";
class ReunionesRoutesController{
    
    //CRUD DE REUNIONES
    public async createReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        var reunionData = request.body;
        reunionData["fechaRegistro"] = new Date();
        reunionData["clienteId"] = request.params.clienteId;
        reunionData["vendedorId"] = request.params.vendedorId;
        let result = await reunion.addReunion(reunionData);
        response.status(201).json({ serverResponse: result });
    }
    public async getReuniones(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        const result: Array<IReunion> = await reunion.readAllReuniones();
        response.status(200).json({ serverResponse: result });
    }
    public async updateReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        var params = request.body;
        var result = await reunion.updateReunion(id,params);
        response.status(200).json({ serverResponse: result });
    }
    public  async getReunionesByVendedor(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.vendedorId;
        var result:Array<IReunion>= await reunion.readReunionesByVendedor(id);
        response.status(200).json({ serverResponse: result });
    }
    public  async getReunionById(request: Request, response:Response)
    {
        var reunion : BusinessReunion = new BusinessReunion();
        let id:string = request.params.id;
        var result = await reunion.readReunion(id)
        response.status(200).json({ serverResponse: result });
    }
    public async removeReunion(request: Request, response: Response) {
        var reunion:BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        let result = await reunion.deleteReunion(id);
        response.status(200).json({ serverResponse: result });
    }
}
export default ReunionesRoutesController;