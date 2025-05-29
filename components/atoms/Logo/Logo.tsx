import { Heart } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size]} bg-primary-green rounded-full flex items-center justify-center`}>
        <Heart className="text-white" size={size === "sm" ? 16 : size === "md" ? 24 : 32} />
      </div>
      {showText && <span className={`font-bold text-primary-brown ${textSizes[size]}`}>VetLife</span>}
    </div>
  )
}
