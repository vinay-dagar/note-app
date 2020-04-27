import React from 'react';
import 'react-native-gesture-handler';
import services from './services/api';

// Routes
import NotesRoutes from './routes/NotesRoute';

const App = () => {
  return (
    <NotesRoutes />
  );
}

export default App;