import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    
    // Demo credentials
    const validCredentials = {
      email: 'admin@premierautohalifax.ca',
      password: 'admin123'
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === validCredentials.email && password === validCredentials.password) {
      const userData = {
        id: '1',
        email: email,
        user_metadata: { role: 'admin' },
        created_at: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setLoading(false);
      
      return { data: { user: userData }, error: null };
    } else {
      setLoading(false);
      return { 
        data: null, 
        error: { message: 'Invalid email or password' } 
      };
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    return { error: null };
  };

  const isAdmin = () => {
    return user?.user_metadata?.role === 'admin' || user?.email === 'admin@premierautohalifax.ca';
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAdmin,
  };
};