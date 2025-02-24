interface CreatePayloadParams {
  firstName: string;
  lastName: string;
  ddd: string;
  phone: string;
}

export function createEvolutionApiPayload({
  firstName,
  lastName,
  ddd,
  phone
}: CreatePayloadParams) {
  const instanceName = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const fullPhone = `55${ddd}9${phone}`;

  return {
    instanceName,
    qrcode: true,
    number: fullPhone,
    integration: 'WHATSAPP-BAILEYS',
    webhook: {
      url: `https://n8n.hipno.se/${instanceName}`,
      byEvents: false,
      base64: true,
      headers: {
        autorization: 'Bearer TOKEN',
        'Content-Type': 'application/json'
      },
      events: [
        'APPLICATION_STARTUP',
        'QRCODE_UPDATED',
        'MESSAGES_SET',
        'MESSAGES_UPSERT',
        'MESSAGES_UPDATE',
        'MESSAGES_DELETE',
        'SEND_MESSAGE',
        'CONNECTION_UPDATE'
      ]
    },
    settings: {
      rejectCall: false,
      readMessages: true,
      readStatus: true,
      alwaysOnline: true
    }
  };
}