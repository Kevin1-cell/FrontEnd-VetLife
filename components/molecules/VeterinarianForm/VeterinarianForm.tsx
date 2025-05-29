"use client"

import type React from "react"
import { useState } from "react"
import Input from "../../atoms/Input/Input"
import Button from "../../atoms/Button/Button"
import Modal from "../../atoms/Modal/Modal"
import { authService, type Veterinarian } from "../../../services/auth.service"

interface VeterinarianFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  veterinarian?: Veterinarian | null
}

export default function VeterinarianForm({ isOpen, onClose, onSuccess, veterinarian }: VeterinarianFormProps) {
  const [formData, setFormData] = useState({
    nombre: veterinarian?.nombre || "",
    especialidad: veterinarian?.especialidad || "",
    experiencia: veterinarian?.experiencia?.toString() || "",
    telefono: veterinarian?.telefono || "",
    correo: veterinarian?.correo || "",
    horario: veterinarian?.horario || "",
    descripcion: veterinarian?.descripcion || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.especialidad.trim()) newErrors.especialidad = "La especialidad es requerida"
    if (!formData.experiencia || Number.parseInt(formData.experiencia) < 0) {
      newErrors.experiencia = "La experiencia debe ser un número válido"
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido"
    }
    if (!formData.horario.trim()) newErrors.horario = "El horario es requerido"
    if (!formData.descripcion.trim()) newErrors.descripcion = "La descripción es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const vetData = {
        ...formData,
        experiencia: Number.parseInt(formData.experiencia),
      }

      if (veterinarian) {
        await authService.updateVeterinarian(veterinarian.id, vetData)
      } else {
        await authService.addVeterinarian(vetData)
      }

      onSuccess()
      onClose()
      resetForm()
    } catch (error) {
      console.error("Error saving veterinarian:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      especialidad: "",
      experiencia: "",
      telefono: "",
      correo: "",
      horario: "",
      descripcion: "",
    })
    setErrors({})
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      resetForm()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={veterinarian ? "Editar Veterinario" : "Agregar Nuevo Veterinario"}
      showCloseButton={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre completo"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            error={errors.nombre}
            placeholder="Dr. Juan Pérez"
            disabled={isSubmitting}
          />
          <Input
            label="Especialidad"
            value={formData.especialidad}
            onChange={(e) => handleChange("especialidad", e.target.value)}
            error={errors.especialidad}
            placeholder="Medicina General"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Años de experiencia"
            type="number"
            value={formData.experiencia}
            onChange={(e) => handleChange("experiencia", e.target.value)}
            error={errors.experiencia}
            placeholder="5"
            disabled={isSubmitting}
          />
          <Input
            label="Teléfono"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            error={errors.telefono}
            placeholder="3001234567"
            disabled={isSubmitting}
          />
        </div>

        <Input
          label="Correo electrónico"
          type="email"
          value={formData.correo}
          onChange={(e) => handleChange("correo", e.target.value)}
          error={errors.correo}
          placeholder="doctor@vetlife.com"
          disabled={isSubmitting}
        />

        <Input
          label="Horario de atención"
          value={formData.horario}
          onChange={(e) => handleChange("horario", e.target.value)}
          error={errors.horario}
          placeholder="Lun-Vie 8:00-18:00"
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            rows={3}
            placeholder="Breve descripción del veterinario y su experiencia..."
            disabled={isSubmitting}
          />
          {errors.descripcion && <p className="mt-1 text-sm text-status-error">{errors.descripcion}</p>}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" isLoading={isSubmitting} className="flex-1">
            {veterinarian ? "Actualizar" : "Agregar"} Veterinario
          </Button>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting} className="flex-1">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
