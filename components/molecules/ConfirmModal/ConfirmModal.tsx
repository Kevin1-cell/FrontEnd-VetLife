"use client"

import { AlertTriangle } from "lucide-react"
import Modal from "../../atoms/Modal/Modal"
import Button from "../../atoms/Button/Button"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  type?: "danger" | "warning" | "info"
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  type = "danger",
}: ConfirmModalProps) {
  const iconColors = {
    danger: "text-status-error",
    warning: "text-status-warning",
    info: "text-status-info",
  }

  const buttonVariants = {
    danger: "danger" as const,
    warning: "secondary" as const,
    info: "primary" as const,
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} showCloseButton={!isLoading}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-status-error/10 mb-4">
          <AlertTriangle className={`h-6 w-6 ${iconColors[type]}`} />
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={buttonVariants[type]} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
