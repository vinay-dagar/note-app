import React from 'react';
import 'react-native-gesture-handler';
import services from './services/api';
import config from './services/config';

// Routes
import NotesRoutes from './routes/NotesRoute';

const App = () => {
  return (
    <NotesRoutes />
  );
}

export default App;