interface RequestResponseProps {
  request: unknown;
  response: unknown;
}

export function RequestResponse({ request, response }: RequestResponseProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Requisição Enviada</h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-[400px]">
          {JSON.stringify(request, null, 2)}
        </pre>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Resposta Recebida</h3>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-[400px]">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
}