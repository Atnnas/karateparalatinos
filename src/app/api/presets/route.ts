import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import PosePreset from "@/models/PosePreset";

// GET: Obtener todos los presets de posturas (público)
export async function GET() {
  try {
    await dbConnect();
    const presets = await PosePreset.find({}).sort({ name: 1 });
    return NextResponse.json(presets);
  } catch (error: any) {
    console.error("Error fetching pose presets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Crear un nuevo preset de postura (solo Admin)
export async function POST(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name, category, angles, landmarks } = await req.json();

    if (!name || !category || !angles || !landmarks) {
      return NextResponse.json(
        { error: "Todos los campos (nombre, categoría, ángulos y puntos corporales) son requeridos" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Comprobar si ya existe una postura con ese nombre
    const existingPreset = await PosePreset.findOne({ name: name.trim() });
    if (existingPreset) {
      return NextResponse.json(
        { error: "Ya existe una postura en el catálogo con este nombre" },
        { status: 400 }
      );
    }

    const newPreset = await PosePreset.create({
      name: name.trim(),
      category,
      angles,
      landmarks,
      createdBy: session.user.email || "Administrador",
    });

    return NextResponse.json({
      message: "Postura oficial guardada correctamente en el catálogo",
      preset: newPreset,
    });
  } catch (error: any) {
    console.error("Error creating pose preset:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Eliminar un preset de postura (solo Admin)
export async function DELETE(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let presetId = searchParams.get("presetId");

    // Intentar leer del body si no está en la query string
    if (!presetId) {
      try {
        const body = await req.json();
        presetId = body.presetId;
      } catch (e) {
        // Body vacío
      }
    }

    if (!presetId) {
      return NextResponse.json({ error: "El ID de la postura es requerido" }, { status: 400 });
    }

    await dbConnect();

    const deletedPreset = await PosePreset.findByIdAndDelete(presetId);

    if (!deletedPreset) {
      return NextResponse.json({ error: "Postura no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Postura eliminada correctamente del catálogo oficial",
    });
  } catch (error: any) {
    console.error("Error deleting pose preset:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
