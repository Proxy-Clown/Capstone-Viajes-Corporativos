
import {viajes} from "@/src/db/schema";
import {db} from "@/src/db"

type Newviaje = typeof viajes.$inferInsert
export const getviajes = async(data:{
    userid:string
    origen:string,
    destino:string,
    fechasalida:Date,
    fecharetorno:Date,
    motivo:string
}) =>{
    try{
        const id = crypto.randomUUID();
        const newviaje: Newviaje={
            id,
            userid:data.userid,
            origen: data.origen,
            destino: data.destino,
            fechasalida: data.fechasalida,
            fecharetorno:data.fecharetorno,
            motivo: data.motivo ?? "",
            estado: "pendiente",
        };
        await db.insert(viajes).values(newviaje);
    } catch (error){
        const e = error as Error
        return{
            success:false,
            message:e.message|| 'Uknown error'
        }
    }
}

//VOLVERE A MIRAR EL MODELO ANTES DE HACER LAS SOLICITUDES!!