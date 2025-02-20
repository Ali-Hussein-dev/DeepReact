import Image from "next/image";
import Link from "next/link";

//======================================
export function Logo() {
  return (
    <Image
      src="/logo.png"
      width={155}
      height={35}
      alt="logo"
      quality={85}
      className="aspect-video h-8 object-fill"
    />
  );
}

//======================================
export function LogoLink() {
  return (
    <Link href={"/"}>
      <Logo />
    </Link>
  );
}
