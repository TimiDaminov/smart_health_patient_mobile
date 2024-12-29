import React from 'react';
import { WebView } from 'react-native-webview';

interface FitbitWebViewProps {
  authUrl: string;
  onAuthComplete: (accessToken: string) => void;
}

const FitbitWebView: React.FC<FitbitWebViewProps> = ({ authUrl, onAuthComplete }) => {
  const handleNavigationChange = (event: { url: string }) => {
    if (event.url.includes('access_token=')) {
      const url = new URL(event.url);
      const token = url.searchParams.get('access_token');
      if (token) {
        onAuthComplete(token);
      }
    }
  };

  return <WebView source={{ uri: authUrl }} onNavigationStateChange={handleNavigationChange} />;
};

export default FitbitWebView;
