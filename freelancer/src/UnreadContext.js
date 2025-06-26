// src/context/UnreadContext.js
import { createContext, useContext, useState } from 'react';

const UnreadContext = createContext();

export const UnreadProvider = ({ children }) => {
  const [unreadTotal, setUnreadTotal] = useState(0);

  return (
    <UnreadContext.Provider value={{ unreadTotal, setUnreadTotal }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => useContext(UnreadContext);
