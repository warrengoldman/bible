import Image from 'next/image';

export default function BibleLogo() {
  return (
      <Image
            src="/bible-logo.jpg"
            width={1000}
            height={925}
            className="ml-9 mb-1 hidden md:block"
            alt="bible logo"
            priority={true}
          />
  );
}
