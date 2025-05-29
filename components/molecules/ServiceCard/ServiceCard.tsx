import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-primary-light">
      <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary-brown mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
