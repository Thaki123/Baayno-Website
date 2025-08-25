import Image from 'next/image';

export default function BookLogo() {
  return (
    <Image src="/logo.svg" alt="Baayno logo" width={120} height={120} priority />
  );
}
