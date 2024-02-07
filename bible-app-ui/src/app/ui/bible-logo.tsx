import Image from 'next/image';

export default function BibleLogo() {
  return (
    <div className={`flex flex-row items-center leading-none`}  >
      <Image
            src="/bible-logo.jpg"
            width={1000}
            height={925}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
    </div>
  );
}
