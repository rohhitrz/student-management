import React from 'react';
import { StudentProvider } from './context/StudentContext';
import { StudentList } from './components/StudentList';

function App() {
  return (
    <StudentProvider>
      <div className="min-h-screen bg-gray-100">
        <StudentList />
      </div>
    </StudentProvider>
  );
}

export default App;