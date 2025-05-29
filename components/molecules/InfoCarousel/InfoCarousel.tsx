"use client"

import { useState, useEffect } from "react"
import { Heart, Shield, Calendar, Stethoscope } from "lucide-react"

const carouselData = [
  {
    icon: <Heart className="text-primary-green" size={24} />,
    title: "Vacunación Anual",
    description: "Recuerda vacunar a tu mascota cada año para mantenerla protegida contra enfermedades.",
    color: "bg-status-success/10",
  },
  {
    icon: <Shield className="text-primary-green" size={24} />,
    title: "Dato Curioso",
    description: "Los gatos pueden hacer más de 100 sonidos diferentes, mientras que los perros solo 10.",
    color: "bg-status-info/10",
  },
  {
    icon: <Calendar className="text-primary-green" size={24} />,
    title: "Revisión Dental",
    description: "El 80% de las mascotas desarrollan problemas dentales antes de los 3 años. ¡Cuida sus dientes!",
    color: "bg-status-warning/10",
  },
  {
    icon: <Stethoscope className="text-primary-green" size={24} />,
    title: "Chequeo Regular",
    description: "Las revisiones veterinarias regulares pueden detectar problemas de salud antes de que se agraven.",
    color: "bg-primary-peach/10",
  },
]

export default function InfoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  const currentItem = carouselData[currentIndex]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-primary-light">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentItem.color}`}>
          {currentItem.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary-brown mb-1">{currentItem.title}</h3>
          <p className="text-gray-600 text-sm">{currentItem.description}</p>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary-green" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
