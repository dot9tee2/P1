import { DashboardLayout } from "@/components/DashboardLayout";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      setConnectionStatus('success');
    } catch (error: any) {
      setConnectionStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">
            Configure your CRM preferences and account settings.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Database Connection</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'loading' ? 'bg-yellow-500' :
                  connectionStatus === 'success' ? 'bg-green-500' :
                  'bg-red-500'
                }`} />
                <span className="font-medium">
                  {connectionStatus === 'loading' ? 'Testing connection...' :
                   connectionStatus === 'success' ? 'Connected to Supabase' :
                   'Connection failed'}
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={testConnection}
                disabled={connectionStatus === 'loading'}
              >
                Test Connection
              </Button>
            </div>
            {connectionStatus === 'error' && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
