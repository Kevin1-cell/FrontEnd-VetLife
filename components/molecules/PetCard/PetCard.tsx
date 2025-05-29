"use client"

import { Edit, Trash2, Heart, Calendar, Weight, Palette } from "lucide-react"
import type { Pet } from "../../../services/auth.service"

interface PetCardProps {
  pet: Pet
  onEdit: (pet: Pet) => void
  onDelete: (petId: string) => void
}

export default function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  const getSpeciesEmoji = (especie: string) => {
    switch (especie.toLowerCase()) {
      case "perro":
        return "🐕"
      case "gato":
        return "🐱"
      case "ave":
        return "🦜"
      case "conejo":
        return "🐰"
      default:
        return "🐾"
    }
  }

  const getSpeciesColor = (especie: string) => {
    switch (especie.toLowerCase()) {
      case "perro":
        return "from-blue-400 to-blue-600"
      case "gato":
        return "from-purple-400 to-purple-600"
      case "ave":
        return "from-yellow-400 to-orange-500"
      case "conejo":
        return "from-pink-400 to-pink-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-primary-light hover:border-primary-green/30">
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-r ${getSpeciesColor(pet.especie)} p-4 text-white`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSpeciesEmoji(pet.especie)}</span>
            <div>
              <h3 className="text-xl font-bold">{pet.nombre}</h3>
              <p className="text-white/90 text-sm">{pet.raza}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(pet)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(pet.id)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary-green" />
            <div>
              <p className="text-xs text-gray-500">Edad</p>
              <p className="font-semibold text-primary-brown">{pet.edad} años</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Weight size={16} className="text-primary-green" />
            <div>
              <p className="text-xs text-gray-500">Peso</p>
              <p className="font-semibold text-primary-brown">{pet.peso} kg</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Palette size={16} className="text-primary-green" />
          <div>
            <p className="text-xs text-gray-500">Color</p>
            <p className="font-semibold text-primary-brown">{pet.color}</p>
          </div>
        </div>

        {pet.observaciones && (
          <div className="bg-primary-light/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={14} className="text-primary-green" />
              <p className="text-xs font-medium text-primary-brown">Observaciones</p>
            </div>
            <p className="text-sm text-gray-600">{pet.observaciones}</p>
          </div>
        )}
      </div>
    </div>
  )
}
