import { NextResponse } from "next/server"; 
import { db } from "@/src/db";
import { viajes } from "@/src/db/schema";
import { tripSchema, type TripFormdb } from "@/src/lib/schemas/tripSchema";

export type ViajeInsert = typeof viajes.$inferInsert;

// Use a named export for the HTTP method you are handling (POST in this case)
export async function POST(request: Request) {
    try {
        // 1. Get the request body as JSON
        const body = await request.json(); 

        // 2. Validate the body using Zod
        const validated = tripSchema.parse(body);

        // 3. Prepare the data for Drizzle ORM
        const viajeData: ViajeInsert = {
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