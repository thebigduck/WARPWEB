import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-deep-space-blue text-starlight-blue min-h-screen font-chypre antialiased selection:bg-cyber-teal selection:text-deep-space-blue">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
