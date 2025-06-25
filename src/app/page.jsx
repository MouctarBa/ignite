import { Container } from '@/components/Container'
import { fetchAPI } from '@/lib/strapi'

async function getStrapiData() {
  console.log('--- DIAGNOSTIC: Attempting to fetch Posts ---');
  try {
    const posts = await fetchAPI('/posts', { populate: '*' });
    console.log('--- DIAGNOSTIC: Successfully fetched Posts ---');
    console.log(JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('--- DIAGNOSTIC: FAILED to fetch Posts ---');
    console.error(error);
  }

  console.log('--- DIAGNOSTIC: Attempting to fetch Case Studies ---');
  try {
    const caseStudies = await fetchAPI('/case-studies', { populate: '*' });
    console.log('--- DIAGNOSTIC: Successfully fetched Case Studies ---');
    console.log(JSON.stringify(caseStudies, null, 2));
  } catch (error) {
    console.error('--- DIAGNOSTIC: FAILED to fetch Case Studies ---');
    console.error(error);
  }

  return null; // We don't need to render anything for this test
}


export default async function HomePage() {
  await getStrapiData();

  return (
    <main>
      <Container>
        <div className="text-center py-24">
          <h1 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
            Diagnostic Test Running...
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Please check the terminal where `npm run dev` is running for diagnostic messages.
          </p>
        </div>
      </Container>
    </main>
  )
}