
import { useState } from 'react';
import Landing from './Landing';
import { Book } from '@/components/BookCard';

const Index = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCartItems(prev => [...prev, book]);
  };

  return <Landing onAddToCart={addToCart} />;
};

export default Index;
