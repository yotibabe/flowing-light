import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesChess } from './components/FeaturesChess';
import { FeaturesGrid } from './components/FeaturesGrid';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesChess />
      <FeaturesGrid />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;