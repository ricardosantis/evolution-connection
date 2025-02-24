import { QrCode } from 'lucide-react';

interface QrCodeStepProps {
  qrCode: string | null;
  step: number;
  isConnected: boolean;
}

export function QrCodeStep({ qrCode, step, isConnected }: QrCodeStepProps) {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <QrCode className="w-5 h-5" />
        {isConnected ? 'Conectado com sucesso!' : 'QR-Code de Acesso'}
      </h3>
      
      <div className="flex-1 flex items-center justify-center">
        {isConnected ? (
          <div className="text-center">
            <img 
              src="https://64.media.tumblr.com/tumblr_me9j27MWqg1rf78nfo1_400.gifv" 
              alt="Success"
              className="w-64 h-64 rounded-lg"
            />
          </div>
        ) : step < 3 || !qrCode ? (
          <div className="text-center">
            <img 
              src="https://i.gifer.com/g0R9.gif" 
              alt="Loading" 
              className="w-64 h-64 rounded-lg bg-transparent"
            />
          </div>
        ) : (
          <div className="bg-white p-4 inline-block rounded-lg shadow-xl">
            <img src={qrCode} alt="QR Code do WhatsApp" className="w-64 h-64" />
          </div>
        )}
      </div>
    </div>
  );
}