import { useEffect, useState } from 'react';
import styles from './Services.module.css';
import cardStyles from './Card.module.css';
import { FaBook, FaBookOpen, FaTools, FaStar, FaFlask, FaIndustry } from 'react-icons/fa';

const icons = { FaBook, FaBookOpen, FaTools, FaStar, FaFlask, FaIndustry };

interface Service {
  icon?: keyof typeof icons;
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
    <section id="services" className={`container ${styles.services}`}>
      <h2 className="heading-font">Services</h2>
      <div className={styles.serviceGrid}>
        {services.map((service, idx) => {
          const Icon = service.icon ? icons[service.icon] : null;
          return (
            <article key={idx} className={cardStyles.card}>
              {Icon && (
                <div className={cardStyles.icon}>
                  <Icon />
                </div>
              )}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
