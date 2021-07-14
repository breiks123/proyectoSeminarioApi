import ClienteModel, { ICliente } from "../models/Cliente";
class BusinessCliente{
    constructor() {

    }
    //crud para modulo cliente
    public async readAllClientes()
    {
        let result = await ClienteModel.find({});
        return result;
    }
    public async readCliente(id:string)
    {
        let result = await ClienteModel.findById(id).exec();
        return result;
    }
    public async readClientesByVendedor(idVen:string)
    {
        let result = await ClienteModel.find({idVendedor:idVen});
        return result;
    }
    public async addCliente(cliente: ICliente) {
        let clienteDb = new ClienteModel(cliente);
        let result = await clienteDb.save();
        return result;
    }
    public async updateCliente(id: string, cliente: any) {
        let result = await ClienteModel.update({ _id: id }, { $set: cliente });
        return result;
    }
    public async deleteCliente(id: string) {
        let result = await ClienteModel.remove({ _id: id });
        return result;
    }

    public async readAllRegularClientes()
    {
        let result = await ClienteModel.find({claseCliente:true});
        return result;
    }   
    public async readAllPotencialClientes()
    {
        let result = await ClienteModel.find({claseCliente:false});
        return result;
    }
    public async readAllRegularClientesByVendedor(id:string)
    {
        let result = await ClienteModel.find({idVendedor:id,claseCliente:false});
        return result;
    }
    public async readAllPotencialClientesByVendedor(id:string)
    {
        let result = await ClienteModel.find({idVendedor:id,claseCliente:false});
        return result;
    }
}
export default BusinessCliente;