"use client"
import Header from "../../organisms/Header/Header"
import HeroSection from "../../organisms/HeroSection/HeroSection"
import ServicesSection from "../../organisms/ServicesSection/ServicesSection"

interface LandingTemplateProps {
  onNavigateToLogin: () => void
  onNavigateToRegister: () => void
}

export default function LandingTemplate({ onNavigateToLogin, onNavigateToRegister }: LandingTemplateProps) {
  return (
    <div className="min-h-screen bg-primary-light">
      <Header onLoginClick={onNavigateToLogin} onRegisterClick={onNavigateToRegister} />
      <HeroSection onGetStarted={onNavigateToRegister} />
      <ServicesSection />

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-primary-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-brown mb-6">
                Más de 10 años cuidando mascotas
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                En VetLife, entendemos que tu mascota es parte de tu familia. Por eso, nos dedicamos a brindar atención
                veterinaria de la más alta calidad con el amor y cuidado que merecen.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-status-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Veterinarios certificados y especializados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-status-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Tecnología médica de última generación</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-status-success rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Atención personalizada para cada mascota</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500&text=🐕🐱+Equipo+VetLife+con+mascotas"
                alt="Equipo veterinario VetLife con mascotas adorables"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-brown mb-6">¿Listo para cuidar a tu mascota?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a nuestra familia VetLife y dale a tu mascota el cuidado que merece. Regístrate hoy y agenda tu
            primera cita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNavigateToRegister}
              className="bg-primary-green text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-green/90 transition-colors"
            >
              Registrarse Ahora
            </button>
            <button
              onClick={onNavigateToLogin}
              className="border-2 border-primary-green text-primary-green px-8 py-3 rounded-lg font-medium hover:bg-primary-green hover:text-white transition-colors"
            >
              Ya tengo cuenta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-brown text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-bold">VetLife</span>
              </div>
              <p className="text-gray-300">Cuidando a tus mascotas con amor y profesionalismo desde 2014.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-300">
                <p>📍 Calle 123 #45-67, Bogotá</p>
                <p>📞 (601) 234-5678</p>
                <p>✉️ info@vetlife.com</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Horarios</h3>
              <div className="space-y-2 text-gray-300">
                <p>Lun - Vie: 8:00 AM - 8:00 PM</p>
                <p>Sábados: 8:00 AM - 6:00 PM</p>
                <p>Domingos: 10:00 AM - 4:00 PM</p>
                <p className="text-status-success">Emergencias 24/7</p>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-600" />
          <div className="text-center text-gray-300">
            <p>&copy; 2024 VetLife. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
