"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, PawPrint, LogOut } from "lucide-react"
import Button from "../../atoms/Button/Button"
import Input from "../../atoms/Input/Input"
import InfoCarousel from "../../molecules/InfoCarousel/InfoCarousel"
import VeterinarianCard from "../../molecules/VeterinarianCard/VeterinarianCard"
import PetCard from "../../molecules/PetCard/PetCard"
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal"
import { authService, type Pet, type User, type Veterinarian } from "../../../services/auth.service"

interface ClientDashboardProps {
  user: User
  onLogout: () => void
}

export default function ClientDashboard({ user, onLogout }: ClientDashboardProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [petToDelete, setPetToDelete] = useState<string | null>(null)
  const [isDeletingPet, setIsDeletingPet] = useState(false)
  const [activeTab, setActiveTab] = useState<"pets" | "vets">("pets")
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    peso: "",
    color: "",
    observaciones: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadPets()
    loadVeterinarians()
  }, [])

  const loadPets = async () => {
    setIsLoading(true)
    try {
      const userPets = await authService.getPetsByClient(user.id)
      setPets(userPets)
    } catch (error) {
      console.error("Error loading pets:", error)
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.especie.trim()) newErrors.especie = "La especie es requerida"
    if (!formData.raza.trim()) newErrors.raza = "La raza es requerida"
    if (!formData.edad || Number.parseInt(formData.edad) <= 0) newErrors.edad = "La edad debe ser mayor a 0"
    if (!formData.peso || Number.parseFloat(formData.peso) <= 0) newErrors.peso = "El peso debe ser mayor a 0"
    if (!formData.color.trim()) newErrors.color = "El color es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const petData = {
        ...formData,
        edad: Number.parseInt(formData.edad),
        peso: Number.parseFloat(formData.peso),
        clientId: user.id,
      }

      if (editingPet) {
        await authService.updatePet(editingPet.id, petData)
      } else {
        await authService.addPet(petData)
      }

      resetForm()
      loadPets()
    } catch (error) {
      console.error("Error saving pet:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet)
    setFormData({
      nombre: pet.nombre,
      especie: pet.especie,
      raza: pet.raza,
      edad: pet.edad.toString(),
      peso: pet.peso.toString(),
      color: pet.color,
      observaciones: pet.observaciones,
    })
    setShowAddForm(true)
  }

  const handleDelete = (petId: string) => {
    setPetToDelete(petId)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!petToDelete) return

    setIsDeletingPet(true)
    try {
      await authService.deletePet(petToDelete)
      loadPets()
      setShowDeleteModal(false)
      setPetToDelete(null)
    } catch (error) {
      console.error("Error deleting pet:", error)
    } finally {
      setIsDeletingPet(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      especie: "",
      raza: "",
      edad: "",
      peso: "",
      color: "",
      observaciones: "",
    })
    setErrors({})
    setShowAddForm(false)
    setEditingPet(null)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-primary-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <PawPrint className="text-primary-green" size={24} />
              <div>
                <h1 className="text-xl font-bold text-primary-brown">Panel de Cliente</h1>
                <p className="text-sm text-gray-600">Bienvenido, {user.nombre}</p>
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
        {/* Carrusel informativo */}
        <InfoCarousel />

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("pets")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "pets"
                ? "bg-primary-green text-white"
                : "bg-white text-primary-brown border border-primary-green hover:bg-primary-green/10"
            }`}
          >
            Mis Mascotas
          </button>
          <button
            onClick={() => setActiveTab("vets")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "vets"
                ? "bg-primary-green text-white"
                : "bg-white text-primary-brown border border-primary-green hover:bg-primary-green/10"
            }`}
          >
            Veterinarios Disponibles
          </button>
        </div>

        {/* Contenido según tab activo */}
        {activeTab === "pets" ? (
          <>
            {/* Actions */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-primary-brown">Mis Mascotas</h2>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus size={16} className="mr-2" />
                Agregar Mascota
              </Button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-primary-brown mb-4">
                  {editingPet ? "Editar Mascota" : "Agregar Nueva Mascota"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      value={formData.nombre}
                      onChange={(e) => handleChange("nombre", e.target.value)}
                      error={errors.nombre}
                      placeholder="Nombre de la mascota"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                      <select
                        value={formData.especie}
                        onChange={(e) => handleChange("especie", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                      >
                        <option value="">Seleccionar especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Ave">Ave</option>
                        <option value="Conejo">Conejo</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {errors.especie && <p className="mt-1 text-sm text-status-error">{errors.especie}</p>}
                    </div>
                    <Input
                      label="Raza"
                      value={formData.raza}
                      onChange={(e) => handleChange("raza", e.target.value)}
                      error={errors.raza}
                      placeholder="Raza de la mascota"
                    />
                    <Input
                      label="Edad (años)"
                      type="number"
                      value={formData.edad}
                      onChange={(e) => handleChange("edad", e.target.value)}
                      error={errors.edad}
                      placeholder="Edad en años"
                    />
                    <Input
                      label="Peso (kg)"
                      type="number"
                      step="0.1"
                      value={formData.peso}
                      onChange={(e) => handleChange("peso", e.target.value)}
                      error={errors.peso}
                      placeholder="Peso en kilogramos"
                    />
                    <Input
                      label="Color"
                      value={formData.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      error={errors.color}
                      placeholder="Color principal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                    <textarea
                      value={formData.observaciones}
                      onChange={(e) => handleChange("observaciones", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                      rows={3}
                      placeholder="Observaciones adicionales (opcional)"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" isLoading={isSubmitting}>
                      {editingPet ? "Actualizar" : "Agregar"} Mascota
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Pets List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando mascotas...</p>
              </div>
            ) : pets.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🐾</span>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes mascotas registradas</h3>
                <p className="text-gray-500 mb-4">Agrega tu primera mascota para comenzar</p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus size={16} className="mr-2" />
                  Agregar Primera Mascota
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Veterinarios */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-brown mb-2">Nuestros Veterinarios</h2>
              <p className="text-gray-600">Conoce a nuestro equipo de profesionales especializados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {veterinarians.map((vet) => (
                <VeterinarianCard key={vet.id} veterinarian={vet} />
              ))}
            </div>
          </>
        )}

        {/* Modal de confirmación */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Eliminar Mascota"
          message="¿Estás seguro de que quieres eliminar esta mascota? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          isLoading={isDeletingPet}
        />
      </div>
    </div>
  )
}
