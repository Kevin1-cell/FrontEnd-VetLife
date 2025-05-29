import { Stethoscope, Scissors, Syringe, Heart, Home, Phone } from "lucide-react"
import ServiceCard from "../../molecules/ServiceCard/ServiceCard"

export default function ServicesSection() {
  const services = [
    {
      icon: <Stethoscope className="text-primary-green" size={24} />,
      title: "Consultas Generales",
      description: "Revisiones completas y diagnósticos precisos para mantener la salud de tu mascota.",
    },
    {
      icon: <Scissors className="text-primary-green" size={24} />,
      title: "Cirugías",
      description: "Procedimientos quirúrgicos con tecnología avanzada y cuidado post-operatorio.",
    },
    {
      icon: <Syringe className="text-primary-green" size={24} />,
      title: "Vacunación",
      description: "Programas de vacunación completos para prevenir enfermedades.",
    },
    {
      icon: <Heart className="text-primary-green" size={24} />,
      title: "Cardiología",
      description: "Especialistas en salud cardiovascular para mascotas con problemas del corazón.",
    },
    {
      icon: <Home className="text-primary-green" size={24} />,
      title: "Visitas a Domicilio",
      description: "Atención veterinaria en la comodidad de tu hogar.",
    },
    {
      icon: <Phone className="text-primary-green" size={24} />,
      title: "Emergencias 24/7",
      description: "Disponibles las 24 horas para cualquier emergencia de tu mascota.",
    },
  ]

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-brown mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios veterinarios para mantener a tu mascota saludable y feliz en todas
            las etapas de su vida.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        {/* Testimonials with pet images */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary-brown mb-8">Nuestros pacientes felices</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=120&width=120&text=🐕+Max"
                alt="Max - Golden Retriever feliz"
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-4 border-primary-green"
              />
              <p className="text-sm font-medium">Max</p>
              <p className="text-xs text-gray-600">Golden Retriever</p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=120&width=120&text=🐱+Luna"
                alt="Luna - Gata persa adorable"
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-4 border-primary-green"
              />
              <p className="text-sm font-medium">Luna</p>
              <p className="text-xs text-gray-600">Gata Persa</p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=120&width=120&text=🐕+Rocky"
                alt="Rocky - Bulldog francés"
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-4 border-primary-green"
              />
              <p className="text-sm font-medium">Rocky</p>
              <p className="text-xs text-gray-600">Bulldog Francés</p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=120&width=120&text=🐱+Mimi"
                alt="Mimi - Gata siamesa"
                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-4 border-primary-green"
              />
              <p className="text-sm font-medium">Mimi</p>
              <p className="text-xs text-gray-600">Gata Siamesa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
