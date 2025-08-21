import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <div className="sticky-header">
        <Navbar />
      </div>
      {children}
      <footer>
        <p>&copy; 2025 Baayno Website</p>
      </footer>
    </>
  );
}
