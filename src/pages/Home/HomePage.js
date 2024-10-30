import React from 'react';
import { Hero } from './components/Hero';
import { Testimonials } from './components/Testimonials';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Faq } from './components/Faq';
import { useTitle } from '../../hooks/useTitle';

export const HomePage = () => {
  useTitle("Explore our EBooks")
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
    </main>
  )
}
