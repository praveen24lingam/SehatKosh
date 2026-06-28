'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface QRCodeDisplayProps {
  url: string
  size?: number
}

export function QRCodeDisplay({ url, size = 120 }: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: {
        dark: '#2D1F0E', // brand-ink
        light: '#FFFFFF'
      }
    })
    .then(url => {
      setQrCodeUrl(url)
    })
    .catch(err => {
      console.error(err)
    })
  }, [url, size])

  if (!qrCodeUrl) return <div style={{ width: size, height: size }} className="animate-pulse bg-gray-200" />

  return (
    <img 
      src={qrCodeUrl} 
      alt="QR Code" 
      width={size} 
      height={size}
      style={{ display: 'block' }}
    />
  )
}
