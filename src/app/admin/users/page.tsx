"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Shield,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
  Loader,
  Calendar,
  Mail,
  UserPlus,
  Pencil,
  Trash2,
  X,
  User,
  Lock,
  Save,
} from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "editor" | "user";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Forms States
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "editor" | "user",
    status: "approved" as "pending" | "approved" | "rejected",
  });

  const [editForm, setEditForm] = useState({
    _id: "",
    name: "",
    email: "",
    role: "user" as "admin" | "editor" | "user",
    status: "approved" as "pending" | "approved" | "rejected",
  });

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    } else if (sessionStatus === "authenticated" && (session?.user as any)?.role !== "admin") {
      router.push("/access-denied");
    }
  }, [sessionStatus, session, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        throw new Error("No database response");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      // Fallback mock data for visual layout design
      setUsers([
        {
          _id: "1",
          name: 'David "kuma" AR',
          email: "david.artavia.rodriguez@gmail.com",
          image: "https://lh3.googleusercontent.com/a/default-user=s96-c",
          role: "admin",
          status: "approved",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "Juan Pérez (Usuario Registrado)",
          email: "juan.perez.dojo@gmail.com",
          role: "user",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          name: "María Gómez (Editora de Contenido)",
          email: "maria.gomez.sensei@gmail.com",
          role: "editor",
          status: "approved",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated" && (session?.user as any)?.role === "admin") {
      fetchUsers();
    }
  }, [sessionStatus, session]);

  const handleUpdateStatus = async (
    userId: string,
    status: "pending" | "approved" | "rejected"
  ) => {
    try {
      setUpdatingId(userId);
      setError(null);
      setSuccessMsg(null);

      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar el estado");
      }

      setSuccessMsg(data.message);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status } : u))
      );

      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email) {
      setError("Nombre y correo electrónico son requeridos");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al crear el usuario");
      }
      setSuccessMsg(data.message);
      setUsers((prev) => [data.user, ...prev]);
      setShowAddModal(false);
      setAddForm({ name: "", email: "", role: "user", status: "approved" });
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.email) {
      setError("Nombre y correo electrónico son requeridos");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editForm._id,
          name: editForm.name,
          email: editForm.email,
          role: editForm.role,
          status: editForm.status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar el usuario");
      }
      setSuccessMsg(data.message);
      setUsers((prev) =>
        prev.map((u) => (u._id === editForm._id ? { ...u, ...editForm } : u))
      );
      setShowEditModal(false);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este usuario?")) {
      return;
    }
    try {
      setUpdatingId(userId);
      setError(null);
      setSuccessMsg(null);

      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al eliminar el usuario");
      }

      setSuccessMsg(data.message);
      setUsers((prev) => prev.filter((u) => u._id !== userId));

      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const openEditModal = (user: UserItem) => {
    setEditForm({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[var(--background)] pt-44">
        <div className="absolute inset-0 bg-dojo-wood shadow-wood-3d shine-sweep-wood -z-10" />
        <div className="text-center bg-white/40 backdrop-blur-md border border-[#8B6914]/30 p-8 rounded-none shadow-[4px_4px_0px_rgba(139,105,20,0.15)]">
          <Loader className="mx-auto h-12 w-12 animate-spin text-[#E52B34]" />
          <p className="mt-4 font-impact-condensed text-xl tracking-widest text-[#3B2210] uppercase">
            Cargando Consola de Administración...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-[var(--background)] admin-page-section pb-24 px-4 sm:px-8 lg:px-16 flex flex-col justify-start items-center overflow-x-hidden">
      {/* Dojo background overlay styling */}
      <div className="absolute inset-0 bg-dojo-wood shadow-wood-3d shine-sweep-wood glass-reflection-wood -z-10" />

      {/* Centered Main Content Wrapper */}
      <div className="w-full max-w-7xl relative z-10 flex flex-col gap-6">
        
        {/* Dynamic Alerts */}
        {error && (
          <div className="flex items-center gap-3 rounded-none border border-red-500/30 bg-red-500/10 p-4 text-red-900 shadow-[2px_2px_0px_rgba(239,68,68,0.2)]">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <span className="font-semibold text-sm">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-3 rounded-none border border-green-500/30 bg-green-500/10 p-4 text-green-950 shadow-[2px_2px_0px_rgba(34,197,94,0.2)]">
            <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        {/* Action Header - Only showing "Nuevo Usuario" button cleanly */}
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-impact-condensed tracking-wider py-2.5 px-5 text-sm font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer"
          >
            <UserPlus className="h-4.5 w-4.5" />
            <span>NUEVO USUARIO</span>
          </button>
        </div>

        {/* Users Table Wrapper */}
        <div className="overflow-hidden bg-white/90 backdrop-blur-md border border-[#8B6914]/25 shadow-[4px_4px_0px_rgba(139,105,20,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#8B6914]/30 bg-[#1E1C1A] text-[#F7F5F0]">
                  <th className="px-6 py-5 font-impact-condensed tracking-widest uppercase text-xs sm:text-sm">Usuario</th>
                  <th className="px-6 py-5 font-impact-condensed tracking-widest uppercase text-xs sm:text-sm">Email</th>
                  <th className="px-6 py-5 font-impact-condensed tracking-widest uppercase text-xs sm:text-sm">Rol</th>
                  <th className="px-6 py-5 font-impact-condensed tracking-widest uppercase text-xs sm:text-sm">Estado</th>
                  <th className="px-6 py-5 font-impact-condensed tracking-widest uppercase text-xs sm:text-sm text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8B6914]/15">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-600 font-medium">
                      No hay usuarios registrados en el sistema.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className={`transition-all duration-200 hover:bg-[#8B6914]/5 ${
                        user.status === "pending" ? "bg-amber-500/[0.02]" : ""
                      }`}
                    >
                      {/* Name & Avatar */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-none border border-[#8B6914]/30 bg-white shadow-sm hover:scale-105 transition-transform duration-200">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-bold text-[#E52B34] bg-neutral-100 text-sm rounded-none">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-neutral-900 leading-tight">{user.name}</span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(user.createdAt).toLocaleDateString("es-ES")}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-sm font-semibold text-neutral-800">
                        <span className="inline-flex items-center gap-1.5 break-all">
                          <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          {user.email}
                        </span>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-none px-2.5 py-1 text-xs font-bold uppercase ${
                            user.role === "admin"
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : user.role === "editor"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                        >
                          <Shield className="w-3 h-3 shrink-0" />
                          {user.role === "admin"
                            ? "Admin"
                            : user.role === "editor"
                            ? "Editor"
                            : "Usuario"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-none px-3 py-1 text-xs font-bold uppercase ${
                            user.status === "approved"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : user.status === "rejected"
                              ? "bg-rose-50 text-rose-800 border border-rose-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-none ${
                              user.status === "approved"
                                ? "bg-emerald-600"
                                : user.status === "rejected"
                                ? "bg-rose-600"
                                : "bg-amber-600 animate-pulse"
                            }`}
                          />
                          {user.status === "approved"
                            ? "Aprobado"
                            : user.status === "rejected"
                            ? "Rechazado"
                            : "Pendiente"}
                        </span>
                      </td>

                      {/* Action Buttons (Strictly Icons) */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {user.email.toLowerCase() !== "david.artavia.rodriguez@gmail.com" ? (
                            <>
                              {/* Approve Button */}
                              {user.status !== "approved" && (
                                <button
                                  onClick={() => handleUpdateStatus(user._id, "approved")}
                                  disabled={updatingId === user._id}
                                  className="p-2 rounded-none bg-emerald-500 hover:bg-emerald-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer disabled:opacity-50"
                                  title="Aprobar acceso"
                                >
                                  <UserCheck className="h-4.5 w-4.5" />
                                </button>
                              )}
                              {/* Reject Button */}
                              {user.status !== "rejected" && (
                                <button
                                  onClick={() => handleUpdateStatus(user._id, "rejected")}
                                  disabled={updatingId === user._id}
                                  className="p-2 rounded-none bg-rose-500 hover:bg-rose-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer disabled:opacity-50"
                                  title="Rechazar acceso"
                                >
                                  <UserX className="h-4.5 w-4.5" />
                                </button>
                              )}
                              {/* Edit Button */}
                              <button
                                onClick={() => openEditModal(user)}
                                disabled={updatingId === user._id}
                                className="p-2 rounded-none bg-amber-500 hover:bg-amber-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer disabled:opacity-50"
                                title="Editar usuario"
                              >
                                <Pencil className="h-4.5 w-4.5" />
                              </button>
                              {/* Delete Button */}
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                disabled={updatingId === user._id}
                                className="p-2 rounded-none bg-red-600 hover:bg-red-700 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer disabled:opacity-50"
                                title="Eliminar usuario"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              {/* Edit Button for Main Admin */}
                              <button
                                onClick={() => openEditModal(user)}
                                disabled={updatingId === user._id}
                                className="p-2 rounded-none bg-amber-500 hover:bg-amber-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] transition-all cursor-pointer disabled:opacity-50"
                                title="Editar mis datos"
                              >
                                <Pencil className="h-4.5 w-4.5" />
                              </button>
                              {/* Disabled Delete Button */}
                              <button
                                disabled
                                className="p-2 rounded-none bg-red-300 text-white shadow-[1px_1px_0px_rgba(0,0,0,0.05)] cursor-not-allowed opacity-50"
                                title="No se puede eliminar al Administrador Principal"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- ADD USER MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div 
            className="relative w-full max-w-lg rounded-none border border-neutral-800 bg-[#121214] p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.35)] text-white max-h-[90vh] overflow-y-auto"
            style={{ padding: "32px" }}
          >
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-6">
              <h3 className="font-sans font-extrabold text-lg tracking-widest text-white uppercase">
                NUEVO USUARIO
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="flex flex-col gap-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <User className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  NOMBRE
                </label>
                <input
                  type="text"
                  required
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="Escribe el nombre completo"
                  className="w-full rounded-none border border-neutral-800 bg-[#1A1A1E] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-[#E52B34] focus:ring-0 focus:outline-none transition-all shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  CORREO (OPCIONAL)
                </label>
                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="w-full rounded-none border border-neutral-800 bg-[#1A1A1E] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-[#E52B34] focus:ring-0 focus:outline-none transition-all shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Shield className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  ROL / PERMISOS
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, role: "user" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all border ${
                      addForm.role === "user"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    USUARIO
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, role: "editor" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all border ${
                      addForm.role === "editor"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    EDITOR
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, role: "admin" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all border ${
                      addForm.role === "admin"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    ADMIN DOJO
                  </button>
                  <button
                    type="button"
                    disabled
                    className="py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center border bg-[#1A1A1E] text-neutral-600 border-neutral-900 cursor-not-allowed opacity-50"
                    title="Super Admin reservado para el propietario"
                  >
                    SUPER ADMIN
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Shield className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  ESTADO DE CUENTA
                </label>
                <div
                  className={`flex items-center justify-between border px-4 py-3.5 rounded-none transition-all duration-200 ${
                    addForm.status === "approved"
                      ? "border-emerald-600/40 bg-emerald-950/10"
                      : "border-red-900/40 bg-red-950/10"
                  }`}
                >
                  <span className={`text-xs font-bold uppercase tracking-wider ${addForm.status === "approved" ? "text-emerald-450" : "text-rose-450"}`}>
                    {addForm.status === "approved" ? "ACTIVO (PERMITIR ACCESO)" : "PENDIENTE DE APROBACIÓN"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAddForm({ ...addForm, status: addForm.status === "approved" ? "pending" : "approved" })}
                    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-none transition-colors duration-200 ease-in-out focus:outline-none border ${
                      addForm.status === "approved"
                        ? "bg-[#00875A] border-[#00875A]"
                        : "bg-neutral-800 border-neutral-750"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-none bg-white shadow transition duration-200 ease-in-out ${
                        addForm.status === "approved" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-none border border-neutral-800 bg-[#202024] hover:bg-neutral-800 hover:text-white text-neutral-400 font-sans py-3.5 text-center font-bold tracking-widest transition-all cursor-pointer text-sm shadow-[inset_0_-2px_0_rgba(229,43,52,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-none bg-[#E52B34] hover:bg-[#c82028] text-white font-sans py-3.5 text-center font-bold tracking-widest transition-all cursor-pointer text-sm shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Save className="h-4.5 w-4.5 shrink-0" />
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div 
            className="relative w-full max-w-lg rounded-none border border-neutral-800 bg-[#121214] p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.35)] text-white max-h-[90vh] overflow-y-auto"
            style={{ padding: "32px" }}
          >
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-6">
              <h3 className="font-sans font-extrabold text-lg tracking-widest text-white uppercase">
                EDITAR USUARIO
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="flex flex-col gap-6">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <User className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  NOMBRE
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Escribe el nombre completo"
                  className="w-full rounded-none border border-neutral-800 bg-[#1A1A1E] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-[#E52B34] focus:ring-0 focus:outline-none transition-all shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  CORREO (OPCIONAL)
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="w-full rounded-none border border-neutral-800 bg-[#1A1A1E] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-[#E52B34] focus:ring-0 focus:outline-none transition-all shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Shield className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  ROL / PERMISOS
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    disabled={editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com"}
                    onClick={() => setEditForm({ ...editForm, role: "user" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center transition-all border ${
                      editForm.role === "user" && editForm.email.toLowerCase() !== "david.artavia.rodriguez@gmail.com"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    } ${editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    USUARIO
                  </button>
                  <button
                    type="button"
                    disabled={editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com"}
                    onClick={() => setEditForm({ ...editForm, role: "editor" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center transition-all border ${
                      editForm.role === "editor" && editForm.email.toLowerCase() !== "david.artavia.rodriguez@gmail.com"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    } ${editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    EDITOR
                  </button>
                  <button
                    type="button"
                    disabled={editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com"}
                    onClick={() => setEditForm({ ...editForm, role: "admin" })}
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center transition-all border ${
                      editForm.role === "admin" && editForm.email.toLowerCase() !== "david.artavia.rodriguez@gmail.com"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)]"
                        : "bg-[#1A1A1E] text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    } ${editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    ADMIN DOJO
                  </button>
                  <button
                    type="button"
                    disabled
                    className={`py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider text-center border transition-all ${
                      editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com"
                        ? "bg-red-950/20 text-[#E52B34] border-[#E52B34] shadow-[0_0_10px_rgba(229,43,52,0.15)] cursor-not-allowed"
                        : "bg-[#1A1A1E] text-neutral-600 border-neutral-900 cursor-not-allowed opacity-50"
                    }`}
                  >
                    SUPER ADMIN
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  <Shield className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  ESTADO DE CUENTA
                </label>
                <div
                  className={`flex items-center justify-between border px-4 py-3.5 rounded-none transition-all duration-200 ${
                    editForm.status === "approved"
                      ? "border-emerald-600/40 bg-emerald-950/10"
                      : "border-red-900/40 bg-red-950/10"
                  } ${editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" ? "opacity-75" : ""}`}
                >
                  <span className={`text-xs font-bold uppercase tracking-wider ${editForm.status === "approved" ? "text-emerald-450" : "text-rose-450"}`}>
                    {editForm.status === "approved" ? "ACTIVO (PERMITIR ACCESO)" : "PENDIENTE DE APROBACIÓN"}
                  </span>
                  <button
                    type="button"
                    disabled={editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com"}
                    onClick={() => setEditForm({ ...editForm, status: editForm.status === "approved" ? "pending" : "approved" })}
                    className={`relative inline-flex h-6 w-12 shrink-0 transition-colors duration-200 ease-in-out focus:outline-none border ${
                      editForm.status === "approved"
                        ? "bg-[#00875A] border-[#00875A]"
                        : "bg-neutral-800 border-neutral-750"
                    } ${editForm.email.toLowerCase() === "david.artavia.rodriguez@gmail.com" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-none bg-white shadow transition duration-200 ease-in-out ${
                        editForm.status === "approved" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-none border border-neutral-800 bg-[#202024] hover:bg-neutral-800 hover:text-white text-neutral-400 font-sans py-3.5 text-center font-bold tracking-widest transition-all cursor-pointer text-sm shadow-[inset_0_-2px_0_rgba(229,43,52,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-none bg-[#E52B34] hover:bg-[#c82028] text-white font-sans py-3.5 text-center font-bold tracking-widest transition-all cursor-pointer text-sm shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  <Save className="h-4.5 w-4.5 shrink-0" />
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
