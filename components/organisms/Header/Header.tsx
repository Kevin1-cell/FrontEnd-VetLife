"use client"

import Logo from "../../atoms/Logo/Logo"
import Navigation from "../../molecules/Navigation/Navigation"

interface HeaderProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navigation onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
        </div>
      </div>
    </header>
  )
}
