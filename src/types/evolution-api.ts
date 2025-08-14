export interface WebhookConfig {
  url: string;
  byEvents: boolean;
  base64: boolean;
  headers: {
    autorization: string;
    'Content-Type': string;
  };
  events: Array<
    | 'APPLICATION_STARTUP'
    | 'QRCODE_UPDATED'
    | 'MESSAGES_SET'
    | 'MESSAGES_UPSERT'
    | 'MESSAGES_UPDATE'
    | 'MESSAGES_DELETE'
    | 'SEND_MESSAGE'
    | 'CONNECTION_UPDATE'
  >;
}

export interface EvolutionApiResponse {
  instance: {
    instanceName: string;
    instanceId: string;
    integration: string;
    webhookWaBusiness: null;
    accessTokenWaBusiness: string;
    status: string;
  };
  hash: string;
  webhook: Record<string, unknown>;
  websocket: Record<string, unknown>;
  rabbitmq: Record<string, unknown>;
  sqs: Record<string, unknown>;
  settings: {
    rejectCall: boolean;
    msgCall: string;
    groupsIgnore: boolean;
    alwaysOnline: boolean;
    readMessages: boolean;
    readStatus: boolean;
    syncFullHistory: boolean;
  };
  qrcode: {
    pairingCode: null;
    code: string;
    base64: string;
    count: number;
  };
}