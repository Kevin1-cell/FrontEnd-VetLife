"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Button from "../../atoms/Button/Button"

interface NavigationProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export default function Navigation({ onLoginClick, onRegisterClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#servicios" className="text-primary-brown hover:text-primary-green transition-colors">
          Servicios
        </a>
        <a href="#nosotros" className="text-primary-brown hover:text-primary-green transition-colors">
          Nosotros
        </a>
        <a href="#contacto" className="text-primary-brown hover:text-primary-green transition-colors">
          Contacto
        </a>
        <Button variant="outline" size="sm" onClick={onLoginClick}>
          Ingresar
        </Button>
        <Button size="sm" onClick={onRegisterClick}>
          Registrarse
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border md:hidden">
          <div className="p-4 space-y-3">
            <a href="#servicios" className="block text-primary-brown hover:text-primary-green">
              Servicios
            </a>
            <a href="#nosotros" className="block text-primary-brown hover:text-primary-green">
              Nosotros
            </a>
            <a href="#contacto" className="block text-primary-brown hover:text-primary-green">
              Contacto
            </a>
            <hr />
            <Button variant="outline" size="sm" className="w-full" onClick={onLoginClick}>
              Ingresar
            </Button>
            <Button size="sm" className="w-full" onClick={onRegisterClick}>
              Registrarse
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
