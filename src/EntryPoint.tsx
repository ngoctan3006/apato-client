import { Provider } from 'react-redux';
import App from './App';
import { persist, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@mui/material';

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        <CssBaseline />
        <App />
      </PersistGate>
    </Provider>
  );
}
