import Layout from '@/components/Layout';
import QuoteForm from '@/components/QuoteForm';
import SEO from '@/components/SEO';

export default function QuotePage() {
  return (
    <Layout>
      <SEO title="Request a Quote - Baayno" canonical="https://www.baayno.com/quote" />
      <QuoteForm />
    </Layout>
  );
}
