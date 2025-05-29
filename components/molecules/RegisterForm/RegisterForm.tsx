"use client"

import type React from "react"

import { useState } from "react"
import Input from "../../atoms/Input/Input"
import Button from "../../atoms/Button/Button"
import { authService } from "../../../services/auth.service"

interface RegisterFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "El usuario es requerido"
    } else if (formData.username.length < 3) {
      newErrors.username = "El usuario debe tener al menos 3 caracteres"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos"
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const { confirmPassword, ...userData } = formData
      const result = await authService.register(userData)

      if (result.success) {
        onSuccess()
      } else {
        setGeneralError(result.error || "Error al registrar usuario")
      }
    } catch (error) {
      setGeneralError("Error de conexión. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    setGeneralError("")
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Usuario"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            error={errors.username}
            placeholder="Usuario"
            disabled={isLoading}
          />
          <Input
            label="Nombre completo"
            type="text"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            error={errors.nombre}
            placeholder="Tu nombre"
            disabled={isLoading}
          />
        </div>

        <Input
          label="Correo electrónico"
          type="email"
          value={formData.correo}
          onChange={(e) => handleChange("correo", e.target.value)}
          error={errors.correo}
          placeholder="tu@email.com"
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Teléfono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            error={errors.telefono}
            placeholder="3001234567"
            disabled={isLoading}
          />
          <Input
            label="Fecha de nacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
            error={errors.fechaNacimiento}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            placeholder="Mínimo 6 caracteres"
            disabled={isLoading}
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            placeholder="Repite la contraseña"
            disabled={isLoading}
          />
        </div>

        {generalError && (
          <div className="bg-status-error/10 border border-status-error text-status-error px-4 py-3 rounded-lg">
            {generalError}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Registrarse
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-green hover:text-primary-green/80 font-medium"
            disabled={isLoading}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  )
}
