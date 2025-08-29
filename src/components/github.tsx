import github from "@/assets/github-mark-white.svg";
import Image from 'next/image'

export default function Github() {
  return (
    <footer className="fixed bottom-4 left-0 right-0 flex justify-center">
      <a
        href="https://github.com/huhulacolle/dl"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500"
      >
        <Image src={github} alt="github" width={40} />
      </a>
    </footer>
  );
}
