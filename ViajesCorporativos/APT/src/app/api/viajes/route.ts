import { NextResponse } from "next/server"; 
import { db } from "@/src/db";
import { viajes,user } from "@/src/db/schema";
import { tripSchema } from "@/src/lib/schemas/tripform";
import {auth} from "@/src/lib/auth"
import {eq} from "drizzle-orm"
export type ViajeInsert = typeof viajes.$inferInsert;

// Use a named export for the HTTP method you are handling (POST in this case)
export async function POST(request: Request) {
    try {

        // 1. Get the request body as JSON
        const body = await request.json(); 

        const session = await auth.api.getSession({headers: request.headers})
        //session check
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Authentication required." },
                { status: 401 } // 401 Unauthorized
            );
        }
        const activeUserId = session.user.id;
        // 2. Validate the body using Zod
        const validated = tripSchema.parse(body);
        //2.1 sesiones
        
        
        // 3. Prepare the data for Drizzle ORM
        const viajeData: ViajeInsert = {
            userId:activeUserId,
            origin: validated.origin,
            destination: validated.destination,
            departureDate:validated.startDate,
            returnDate: validated.endDate,
            motive: validated.reason,
            status: "PENDING", 
        };

        // 4. Insert data into the database
        const result = await db.insert(viajes).values(viajeData).returning();

        // 5. Return a JSON response with status 201 (Created)
        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        console.error("Database insertion error:", error);
        
        // Handle validation errors or unknown errors
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        
        // Return a JSON error response with status 400 (Bad Request)
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
}
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    const activeUserId = session.user.id;

    // Query only trips belonging to this user + optionally join user table
    const result = await db
      .select({
        id: viajes.id,
        origen: viajes.origin,
        destino: viajes.destination,
        motivo: viajes.motive,
        estado: viajes.status,
        nombreUsuario: user.name,
      })
      .from(viajes)
      .leftJoin(user, eq(viajes.userId, user.id))  // join user
      .where(eq(viajes.userId, activeUserId));     // filter by current user

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching user trips." },
      { status: 500 }
    );
  }
}