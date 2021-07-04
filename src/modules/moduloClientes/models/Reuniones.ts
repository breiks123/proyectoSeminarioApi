//Horacio
import mongoose, { Document, Schema } from "mongoose";
export interface IReunion extends Document {
    clienteId: string,
    vendedorId: string,
    reunionFecha:Date,
    resultadoReunion?:boolean,
    reunionRealizada?:boolean,
    fechaRegistro?:Date
}
const ReunionSchema = new Schema({
    clienteId:{type:String, required:true},
    vendedorId:{type:String, require:true},
    reunionFecha:{type:Date, required:true},
    resultadoReunion:{type: Boolean},
    reunionRealizada:{type:Boolean},
    fechaRegistro:{type:Date}

});
export default mongoose.model<IReunion>("Reuniones", ReunionSchema);