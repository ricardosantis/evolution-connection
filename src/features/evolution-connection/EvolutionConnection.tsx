import { useEvolutionConnection } from './hooks/useEvolutionConnection';
import { PageHeader } from './components/PageHeader';
import { StepIndicator } from './components/StepIndicator';
import { SecretCodeStep } from './components/SecretCodeStep';
import { UserDetailsStep } from './components/UserDetailsStep';
import { QrCodeStep } from './components/QrCodeStep';
import { ConnectionLog } from './components/ConnectionLog';

export function EvolutionConnection() {
  const {
    step,
    formState,
    handlers,
    logs,
    qrCode,
    isConnected
  } = useEvolutionConnection();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Main Content */}
          <div className="bg-black backdrop-blur-sm rounded-lg p-6 border border-white/10">
            {step === 1 && (
              <SecretCodeStep
                secretCode={formState.secretCode}
                onSecretCodeChange={handlers.onSecretCodeChange}
                onSubmit={handlers.onSecretCodeSubmit}
              />
            )}
            {step === 2 && (
              <UserDetailsStep
                values={formState}
                onChange={handlers.onFormChange}
                onSubmit={handlers.onFormSubmit}
              />
            )}
            {step >= 3 && (
              <QrCodeStep
                qrCode={qrCode}
                step={step}
                isConnected={isConnected}
              />
            )}
          </div>

          {/* Right Column - Connection Log */}
          <div className="bg-black backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <ConnectionLog
              logs={logs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}