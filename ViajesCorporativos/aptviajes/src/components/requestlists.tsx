"use client";
import {Card,CardHeader
    
} from "@/components/ui/card"
const fakeRequests = [
  { id: '1', name: 'oli', destino: 'CL',motivo:"wiwi",estado:"Pendiente" },
  { id: '2', name: 'olo', destino: 'ARG',motivo:"wiwi",estado:"Rechazado" },
  { id: '3', name: 'ala', destino: 'BR',motivo:"wiwi",estado: "Aceptado"},
]


const Requestlist = () => {
  return (
    <div>
            <h1>Solicitudes</h1>
            
                {fakeRequests.map((request) => (
                    <Card key={request.id} className="gap-2">
                            <a>
                             Usuario:
                             Destino:    
                             motivo:
                            </a>
                            <a> 
                                {request.name}
                                {request.destino}
                                {request.motivo}
                            </a>

                    </Card>
               
        ))}
      
      
    </div>
  )
}

export default Requestlist