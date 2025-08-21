import { useEffect, useState } from 'react';
import styles from './Services.module.css';

interface Service {
  icon?: string;
  title: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/data/company.json')
      .then(res => res.json())
      .then((data: { services?: Service[] }) => setServices(data.services || []))
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="container">
      <h2 className="heading-font">Services</h2>
      <div className={styles.serviceGrid}>
        {services.map((service, idx) => (
          <article key={idx} className="card">
            {service.icon && <div className="icon">{service.icon}</div>}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
