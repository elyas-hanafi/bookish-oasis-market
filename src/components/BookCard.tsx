
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
              -{discount}%
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-amber-600 text-white">
            {book.category}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({book.rating})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-600">${book.price}</span>
            {book.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${book.originalPrice}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex space-x-2 p-4 pt-0">
        <Link to={`/book/${book.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button 
          onClick={() => onAddToCart(book)}
          className="flex-1 bg-amber-600 hover:bg-amber-700"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
