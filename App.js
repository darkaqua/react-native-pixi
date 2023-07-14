import {SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  
  const PolicyHTML = require('./assets/index.html');


  const debugging = `
    const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
    console = {
        log: (log) => consoleLog('log', log),
        debug: (log) => consoleLog('debug', log),
        info: (log) => consoleLog('info', log),
        warn: (log) => consoleLog('warn', log),
        error: (log) => consoleLog('error', log),
      };
  `;

  const onMessage = (event) => {
    event.persist();
    let dataPayload;
    try {
      dataPayload = JSON.parse(event.nativeEvent.data);
    } catch (e) {
    }

    if (dataPayload) {
      if (dataPayload.type === "Console") {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        console.log(dataPayload);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        scalesPageToFit={true}
        injectedJavaScript={debugging}
        onMessage={onMessage}
        onError={event => console.log(event)}
        source={PolicyHTML}
        originWhitelist={['*']}
      />
    </SafeAreaView>
  );
}
