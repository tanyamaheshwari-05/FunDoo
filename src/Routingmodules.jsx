import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import SignIn from './Pages/signIn/signIn';
import SignUp from './Pages/signUp/SignUp';
import Dashboard from './Dashboard/Fundo';
import Notes from './Components/Notes/NotesContainer';
import Archive from './Components/Archived/Archieved';
import Trash from './Components/Trash/Trash';
import Reminders from './Components/Reminders/reminders';

import ProtectedRoute from './Routing/ProtectRouted';
import AuthRoute from './Routing/AuthRouted';

export default function ReactRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
        <Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/home"  />} />
          <Route path="home" element={<Notes />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="archive" element={<Archive />} />
          <Route path="trash" element={<Trash />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}