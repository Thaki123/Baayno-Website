import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import SEO from '@/components/SEO';
import styles from './Contact.module.css';

interface CompanyInfo {
  address: string;
  phones: string[];
}

export default function ContactPage() {
  const [info, setInfo] = useState<CompanyInfo>({ address: '', phones: [] });

  useEffect(() => {
    fetch('/data/company.json')
      .then(res => res.json())
      .then((data: CompanyInfo) => setInfo({ address: data.address, phones: data.phones || [] }))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEO title="Contact - Baayno" canonical="https://www.baayno.com/contact" />
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className="heading-font">Contact Us</h2>
          <div className={styles.companyDetails}>
            <p>{info.address}</p>
            <p>
              {info.phones.map((phone, idx) => (
                <span key={phone}>
                  {idx > 0 && ', '}
                  <a href={`tel:${phone}`}>{phone}</a>
                </span>
              ))}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
