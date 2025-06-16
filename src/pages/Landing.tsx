
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookCard, { Book } from '@/components/BookCard';
import { books } from '@/data/books';
import { ArrowRight, Star, Users, BookOpen } from 'lucide-react';

interface LandingProps {
  onAddToCart: (book: Book) => void;
}

const Landing = ({ onAddToCart }: LandingProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];
  const featuredBooks = books.slice(0, 3);
  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      text: "BookHaven has an incredible selection! I found rare books I couldn't find anywhere else.",
      rating: 5
    },
    {
      name: "James Wilson",
      text: "Fast shipping and excellent customer service. My go-to bookstore for all genres.",
      rating: 5
    },
    {
      name: "Emma Davis",
      text: "The quality of books is outstanding, and the prices are very competitive.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Discover Your Next
                <span className="text-amber-600"> Great Read</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Explore thousands of books across all genres. From bestsellers to hidden gems, 
                find your perfect book at BookHaven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8">
                  Browse Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80"
                alt="Books on shelf"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-bold text-gray-900">50,000+</p>
                    <p className="text-sm text-gray-600">Books Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-xl text-gray-600">Handpicked selections from our expert curators</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories & All Books */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find books in your favorite genres</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-xl">Books Available</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">100,000+</h3>
              <p className="text-xl">Happy Customers</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">4.9/5</h3>
              <p className="text-xl">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied book lovers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community of book lovers and discover your next favorite book today.
          </p>
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-lg px-8">
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
