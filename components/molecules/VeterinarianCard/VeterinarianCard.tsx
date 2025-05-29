import { Phone, Mail, Clock, Award } from "lucide-react"
import type { Veterinarian } from "../../../services/auth.service"

interface VeterinarianCardProps {
  veterinarian: Veterinarian
}

export default function VeterinarianCard({ veterinarian }: VeterinarianCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-primary-light hover:border-primary-green/30">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-primary-green/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {veterinarian.nombre
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary-brown mb-1">{veterinarian.nombre}</h3>
          <p className="text-primary-green font-medium mb-2">{veterinarian.especialidad}</p>
          <p className="text-gray-600 text-sm mb-3">{veterinarian.descripcion}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award size={16} className="text-primary-green" />
              <span>{veterinarian.experiencia} años de experiencia</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-primary-green" />
              <span>{veterinarian.horario}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} className="text-primary-green" />
              <span>{veterinarian.telefono}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} className="text-primary-green" />
              <span>{veterinarian.correo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-primary-green/90 transition-colors font-medium">
          Agendar Cita
        </button>
      </div>
    </div>
  )
}
