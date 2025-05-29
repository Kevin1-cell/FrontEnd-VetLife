"use client"

import { useState, useEffect } from "react"
import LandingTemplate from "../components/templates/LandingTemplate/LandingTemplate"
import LoginForm from "../components/molecules/LoginForm/LoginForm"
import RegisterForm from "../components/molecules/RegisterForm/RegisterForm"
import ClientDashboard from "../components/organisms/ClientDashboard/ClientDashboard"
import AdminDashboard from "../components/organisms/AdminDashboard/AdminDashboard"
import Logo from "../components/atoms/Logo/Logo"
import { authService, type User } from "../services/auth.service"

type ViewType = "landing" | "login" | "register" | "client-dashboard" | "admin-dashboard"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewType>("landing")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario logueado al cargar la página
    const user = authService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setCurrentView(user.role === "admin" ? "admin-dashboard" : "client-dashboard")
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user)
    setCurrentView(user.role === "admin" ? "admin-dashboard" : "client-dashboard")
  }

  const handleRegisterSuccess = () => {
    setCurrentView("login")
  }

  const handleLogout = () => {
    authService.logout()
    setCurrentUser(null)
    setCurrentView("landing")
  }

  const handleNavigateToLogin = () => {
    setCurrentView("login")
  }

  const handleNavigateToRegister = () => {
    setCurrentView("register")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-brown">Cargando VetLife...</p>
        </div>
      </div>
    )
  }

  // Renderizar según la vista actual
  switch (currentView) {
    case "landing":
      return (
        <LandingTemplate onNavigateToLogin={handleNavigateToLogin} onNavigateToRegister={handleNavigateToRegister} />
      )

    case "login":
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary-beige/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo size="lg" />
              </div>
              <h1 className="text-2xl font-bold text-primary-brown mb-2">Iniciar Sesión</h1>
              <p className="text-gray-600">Accede a tu cuenta de VetLife</p>
            </div>

            <LoginForm onSuccess={handleLoginSuccess} onSwitchToRegister={() => setCurrentView("register")} />

            <div className="mt-6 text-center">
              <button onClick={handleBackToLanding} className="text-primary-green hover:text-primary-green/80 text-sm">
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )

    case "register":
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary-beige/30 flex items-center justify-center py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo size="lg" />
              </div>
              <h1 className="text-2xl font-bold text-primary-brown mb-2">Crear Cuenta</h1>
              <p className="text-gray-600">Únete a la familia VetLife</p>
            </div>

            <RegisterForm onSuccess={handleRegisterSuccess} onSwitchToLogin={() => setCurrentView("login")} />

            <div className="mt-6 text-center">
              <button onClick={handleBackToLanding} className="text-primary-green hover:text-primary-green/80 text-sm">
                ← Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )

    case "client-dashboard":
      return currentUser ? (
        <ClientDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <div>Error: Usuario no encontrado</div>
      )

    case "admin-dashboard":
      return currentUser ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <div>Error: Usuario no encontrado</div>
      )

    default:
      return <div>Vista no encontrada</div>
  }
}
