"use client"

import { Heart, Shield, Clock } from "lucide-react"
import Button from "../../atoms/Button/Button"

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary-light to-primary-beige/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-brown mb-6">
              Cuidamos a tus
              <span className="text-primary-green"> mascotas</span> como familia
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              En VetLife brindamos atención veterinaria de calidad con amor y profesionalismo. Tu mascota merece el
              mejor cuidado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" onClick={onGetStarted}>
                Comenzar Ahora
              </Button>
              <Button variant="outline" size="lg">
                Conocer Servicios
              </Button>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Heart className="text-primary-green" size={20} />
                <span className="text-sm text-gray-600">Atención 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-primary-green" size={20} />
                <span className="text-sm text-gray-600">Profesionales certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-primary-green" size={20} />
                <span className="text-sm text-gray-600">Citas rápidas</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600&text=🐕🐱+Veterinario+cuidando+mascotas"
              alt="Veterinario cuidando mascotas adorables"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-success rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🐾</span>
                </div>
                <div>
                  <p className="font-semibold text-primary-brown">+1000</p>
                  <p className="text-sm text-gray-600">Mascotas felices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
