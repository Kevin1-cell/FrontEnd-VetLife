"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Edit, Trash2, Users, LogOut, Plus } from "lucide-react"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
import VeterinarianForm from "../../molecules/VeterinarianForm/VeterinarianForm"
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal"
import { authService, type User, type Veterinarian } from "../../../services/auth.service"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([])
  const [showVetForm, setShowVetForm] = useState(false)
  const [editingVet, setEditingVet] = useState<Veterinarian | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "user" | "vet" } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState<"users" | "vets">("users")

  useEffect(() => {
    loadUsers()
    loadVeterinarians()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const allUsers = await authService.getAllUsers()
      setUsers(allUsers)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadVeterinarians = async () => {
    try {
      const allVets = await authService.getAllVeterinarians()
      setVeterinarians(allVets)
    } catch (error) {
      console.error("Error loading veterinarians:", error)
    }
  }

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(
      (user) =>
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.includes(searchTerm),
    )
    setFilteredUsers(filtered)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setEditFormData({
      nombre: user.nombre || "",
      correo: user.correo || "",
      telefono: user.telefono || "",
      fechaNacimiento: user.fechaNacimiento || "",
    })
    setShowEditForm(true)
  }

  const handleDelete = (id: string, type: "user" | "vet") => {
    setItemToDelete({ id, type })
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setIsDeleting(true)
    try {
      if (itemToDelete.type === "user") {
        await authService.deleteUser(itemToDelete.id)
        loadUsers()
      } else {
        await authService.deleteVeterinarian(itemToDelete.id)
        loadVeterinarians()
      }
      setShowDeleteModal(false)
      setItemToDelete(null)
    } catch (error) {
      console.error("Error deleting:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const validateEditForm = () => {
    const newErrors: Record<string, string> = {}

    if (!editFormData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!editFormData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(editFormData.correo)) {
      newErrors.correo = "El correo no es válido"
    }

    if (!editFormData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !validateEditForm()) return

    setIsSubmitting(true)
    try {
      await authService.updateUser(selectedUser.id, editFormData)
      setShowEditForm(false)
      setSelectedUser(null)
      loadUsers()
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleEditVet = (vet: Veterinarian) => {
    setEditingVet(vet)
    setShowVetForm(true)
  }

  const handleVetFormSuccess = () => {
    loadVeterinarians()
    setShowVetForm(false)
    setEditingVet(null)
  }

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Users className="text-primary-green" size={24} />
              <div>
                <h1 className="text-xl font-bold text-primary-brown">Panel de Administrador</h1>
                <p className="text-sm text-gray-600">Gestión de usuarios - {user.nombre}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut size={16} className="mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "users"
                ? "bg-primary-green text-white"
                : "bg-white text-primary-brown border border-primary-green hover:bg-primary-green/10"
            }`}
          >
            Gestión de Usuarios
          </button>
          <button
            onClick={() => setActiveTab("vets")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "vets"
                ? "bg-primary-green text-white"
                : "bg-white text-primary-brown border border-primary-green hover:bg-primary-green/10"
            }`}
          >
            Gestión de Veterinarios
          </button>
        </div>

        {activeTab === "users" ? (
          <>
            {/* Search and Stats */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary-brown">Gestión de Usuarios</h2>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                  <span className="text-sm text-gray-600">Total usuarios: </span>
                  <span className="font-semibold text-primary-green">{users.length}</span>
                </div>
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
            </div>

            {/* Users Table */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando usuarios...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchTerm ? "No se encontraron usuarios" : "No hay usuarios registrados"}
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Intenta con otros términos de búsqueda"
                    : "Los usuarios aparecerán aquí cuando se registren"}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary-beige/30">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          Correo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          Teléfono
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-primary-brown uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.correo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.telefono}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 text-primary-green hover:bg-primary-green/10 rounded-lg transition-colors"
                                title="Editar usuario"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id, "user")}
                                className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors"
                                title="Eliminar usuario"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Veterinarians Management */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-primary-brown">Gestión de Veterinarios</h2>
                <p className="text-gray-600">Administra el equipo de veterinarios</p>
              </div>
              <Button onClick={() => setShowVetForm(true)}>
                <Plus size={16} className="mr-2" />
                Agregar Veterinario
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {veterinarians.map((vet) => (
                <div key={vet.id} className="bg-white rounded-xl shadow-lg p-6 border border-primary-light">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-green/80 rounded-full flex items-center justify-center text-white font-bold">
                      {vet.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditVet(vet)}
                        className="p-2 text-primary-green hover:bg-primary-green/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(vet.id, "vet")}
                        className="p-2 text-status-error hover:bg-status-error/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-primary-brown mb-1">{vet.nombre}</h3>
                  <p className="text-primary-green text-sm font-medium mb-2">{vet.especialidad}</p>
                  <p className="text-gray-600 text-sm mb-3">{vet.descripcion}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>📞 {vet.telefono}</p>
                    <p>✉️ {vet.correo}</p>
                    <p>🕒 {vet.horario}</p>
                    <p>⭐ {vet.experiencia} años de experiencia</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modales */}
        <VeterinarianForm
          isOpen={showVetForm}
          onClose={() => {
            setShowVetForm(false)
            setEditingVet(null)
          }}
          onSuccess={handleVetFormSuccess}
          veterinarian={editingVet}
        />

        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title={`Eliminar ${itemToDelete?.type === "user" ? "Usuario" : "Veterinario"}`}
          message={`¿Estás seguro de que quieres eliminar este ${itemToDelete?.type === "user" ? "usuario" : "veterinario"}? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          isLoading={isDeleting}
        />

        {/* Edit User Form Modal */}
        {showEditForm && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold text-primary-brown mb-4">Editar Usuario: {selectedUser.nombre}</h3>
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <Input
                  label="Nombre completo"
                  value={editFormData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  error={errors.nombre}
                />
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={editFormData.correo}
                  onChange={(e) => handleChange("correo", e.target.value)}
                  error={errors.correo}
                />
                <Input
                  label="Teléfono"
                  value={editFormData.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  error={errors.telefono}
                />
                <Input
                  label="Fecha de nacimiento"
                  type="date"
                  value={editFormData.fechaNacimiento}
                  onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                />
                <div className="flex gap-4 pt-4">
                  <Button type="submit" isLoading={isSubmitting}>
                    Actualizar
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditForm(false)} disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
