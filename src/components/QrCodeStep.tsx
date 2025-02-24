interface QrCodeStepProps {
  qrCode: string;
}

export function QrCodeStep({ qrCode }: QrCodeStepProps) {
  return (
    <div className="text-center">
      <div className="bg-white p-4 inline-block rounded-lg shadow-xl">
        <img src={qrCode} alt="QR Code do WhatsApp" className="w-64 h-64" />
      </div>
      <p className="mt-4 text-gray-400 text-sm">
        Escaneie este QR code com seu WhatsApp para conectar
      </p>
    </div>
  );
}