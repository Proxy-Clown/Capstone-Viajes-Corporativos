export interface Viaje {
  id: number;
  origen: string;
  destino: string;
  motivo:string;
  estado: "PENDING" | "APPROVED" | "REJECTED";
}

export function ViajeCard({ viaje }: { viaje: Viaje }) {
  const statusColors: Record<Viaje["estado"], string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-md w-full bg-white shadow-sm rounded-2xl p-5 border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {viaje.origen} → {viaje.destino}
        </h2>
        
        <div className="text-sm text-gray-600 space-y-1">  
          <p><strong>Motive:</strong> {viaje.motivo}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[viaje.estado]}`}
        >
          {viaje.estado}
        </span>
      </div>  

      

    </div>
  );
}

//Tarjeta con los datos de la base de datos de viajes (solo los necesarios)