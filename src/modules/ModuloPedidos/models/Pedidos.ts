import mongoose, {Schema,Document } from 'mongoose';


export interface IPedido extends Document
{
    nombreCLiente:string,
    nombreVendedor:string,
    vendedorId:string,
    clienteId:string,
    fechaEntrega:Date,
    registerDate:Date
    estadoPedido:boolean,//entregado- no entregado
    pagoTotal:string,
    uriRecibo?:string,
    pathRecibo?:string,
    metodoPago:string,//efectivo-cuenta bancaria
    ordenarPedido?:boolean,//cuando se cancela el pedido
    motivoCancelacion?:string,//tiene stock - no tiene efectivo - otro
    productosPedido?:[
        {
            idProducto:string,
            nombreProduto:string,
            cantidad:number,
            costoUnitario:number,
            costoTotal:string,
        }

    ]
}

const pedidoSchema: Schema = new Schema({
    nombreCLiente:{type:String},
    nombreVendedor:{type:String},
    vendedorId:{type:String},
    clienteId:{type:String},
    fechaEntrega:Date,
    registerDate:Date,
    uriPedido:{type:String},
    pathPedido:{type:String},
    estadoPedido:{type:Boolean},//entregado- no entregado
    pagoTotal:{type:String},
    metodoPago:{type:String},//efectivo-cuenta bancaria
    ordenarPedido:{type:Boolean},//cuando se cancela el pedido
    motivoCancelacion:{type:String},//tiene stock - no tiene efectivo - otro
    productosPedido:[
        {
            idProducto:{type:String},
            nombreProduto:{type:String},
            cantidad:{type:Number},
            costoUnitario:{type:Number},
            costoTotal:{type:String},
        }

    ]
  
});
export default mongoose.model<IPedido>("Pedidos", pedidoSchema);