import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

// GET: List all users (only accessible by Admin)
export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update user status/role (only accessible by Admin)
export async function PUT(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { userId, role, status, name, email } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await dbConnect();

    // Find user to be updated
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Safety check: Don't allow changing the main admin's role or status
    if (
      userToUpdate.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" &&
      (role !== "admin" || status !== "approved")
    ) {
      return NextResponse.json(
        { error: "No se puede degradar o desaprobar al administrador principal." },
        { status: 400 }
      );
    }

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email.toLowerCase();
    if (role) userToUpdate.role = role;
    if (status) userToUpdate.status = status;

    await userToUpdate.save();

    return NextResponse.json({
      message: "Usuario actualizado correctamente",
      user: userToUpdate,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new user manually (only accessible by Admin)
export async function POST(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name, email, role, status } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y correo electrónico son requeridos" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Un usuario con este correo electrónico ya existe" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      role: role || "user",
      status: status || "approved",
      image: `https://lh3.googleusercontent.com/a/default-user=s96-c`, // default avatar
    });

    return NextResponse.json({
      message: "Usuario creado correctamente",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a user (only accessible by Admin)
export async function DELETE(req: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let userId = searchParams.get("userId");

    // Fallback: check request body if not in query params
    if (!userId) {
      try {
        const body = await req.json();
        userId = body.userId;
      } catch (e) {
        // Body might be empty or invalid
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await dbConnect();

    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Safety check: Don't allow deleting the main admin
    if (userToDelete.email.toLowerCase() === "david.artavia.rodriguez@gmail.com") {
      return NextResponse.json(
        { error: "No se puede eliminar al administrador principal." },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

