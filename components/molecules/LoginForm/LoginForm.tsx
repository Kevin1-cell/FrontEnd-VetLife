"use client"

import type React from "react"

import { useState } from "react"
import Input from "../../atoms/Input/Input"
import Button from "../../atoms/Button/Button"
import { authService } from "../../../services/auth.service"

interface LoginFormProps {
  onSuccess: (user: any) => void
  onSwitchToRegister: () => void
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "El usuario es requerido"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
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
      const result = await authService.login(formData.username, formData.password)

      if (result.success && result.user) {
        onSuccess(result.user)
      } else {
        setGeneralError(result.error || "Error al iniciar sesión")
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Usuario"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            error={errors.username}
            placeholder="Ingresa tu usuario"
            disabled={isLoading}
          />
        </div>

        <div>
          <Input
            label="Contraseña"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            placeholder="Ingresa tu contraseña"
            disabled={isLoading}
          />
        </div>

        {generalError && (
          <div className="bg-status-error/10 border border-status-error text-status-error px-4 py-3 rounded-lg">
            {generalError}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿No tienes cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-primary-green hover:text-primary-green/80 font-medium"
            disabled={isLoading}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}
