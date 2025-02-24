import { CheckCircle } from 'lucide-react';

export function SuccessAnimation() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        Dados Confirmados
      </h3>
      
      <div className="relative w-64 h-64">
        <img 
          src="https://cdn.dribbble.com/users/337549/screenshots/1857876/media/e059e484a68f754393593c291c83aa9d.gif" 
          alt="Success Animation"
          className="w-full h-full object-contain"
        />
      </div>
      
      <p className="mt-4 text-gray-400">
        Escaneie o QR Code ao lado para finalizar a conexão
      </p>
    </div>
  );
}