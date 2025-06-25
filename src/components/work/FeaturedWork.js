"use client"; // <-- THIS IS THE FIX

import { useEffect } from 'react';
import { Container } from '@/components/Container';
import { fetchAPI } from '@/lib/strapi';

export function FeaturedWork() {
  useEffect(() => {
    async function performTestFetch() {
      console.log('--- DIAGNOSTIC: Starting API fetch for Case Studies ---');
      try {
        const caseStudiesRes = await fetchAPI('/case-studies', { populate: '*' });
        console.log('--- DIAGNOSTIC: API Fetch Successful! ---');
        console.log('--- RECEIVED DATA: ---');
        console.log(JSON.stringify(caseStudiesRes, null, 2)); // Log the full response
      } catch (error) {
        console.error('--- DIAGNOSTIC: API Fetch FAILED ---');
        console.error(error);
      }
    }
    performTestFetch();
  }, []);

  return (
    <section className="bg-white py-16">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
            Checking Strapi Connection...
          </h2>
          <p className="mt-4 text-lg">
            Please check the terminal where `npm run dev` is running for diagnostic messages.
          </p>
        </div>
      </Container>
    </section>
  );
}