
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { books } from '@/data/books';
import { Book } from '@/components/BookCard';
import { toast } from '@/hooks/use-toast';

interface BookDetailsProps {
  onAddToCart: (book: Book) => void;
}

const BookDetails = ({ onAddToCart }: BookDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(book);
    }
    toast({
      title: "Added to cart!",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Book link has been copied to clipboard.",
    });
  };

  const discount = book.originalPrice ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100) : 0;
  const relatedBooks = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white text-lg px-3 py-1">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3" variant="secondary">{book.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-xl ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">({book.rating} / 5)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-amber-600">${book.price}</span>
                {book.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">${book.originalPrice}</span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{book.description}</p>
            </div>

            <Separator />

            {/* Purchase Controls */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border rounded">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-lg py-3"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - ${(book.price * quantity).toFixed(2)}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleWishlist}
                  className={isWishlisted ? "text-red-600" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Book Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Book Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Author:</span>
                    <p className="text-gray-600">{book.author}</p>
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>
                    <p className="text-gray-600">{book.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span>
                    <p className="text-gray-600">{book.rating}/5</p>
                  </div>
                  <div>
                    <span className="font-medium">Price:</span>
                    <p className="text-gray-600">${book.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Card key={relatedBook.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={relatedBook.image}
                      alt={relatedBook.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold mb-2">{relatedBook.title}</h3>
                    <p className="text-gray-600 mb-2">by {relatedBook.author}</p>
                    <p className="text-amber-600 font-bold">${relatedBook.price}</p>
                    <Button 
                      className="w-full mt-3" 
                      variant="outline"
                      onClick={() => navigate(`/book/${relatedBook.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
