import { LogoImg } from "@/app/_assets/images/Image";
import Image from "next/image";
import Link from "next/link";

function Logo({ size = "lg" }) {
  const sizes = {
    lg: {
      width: "50",
      height: "50",
      containerClassName: "gap-4",
      text: "text-xl",
    },
    md: {
      width: "40",
      height: "40",
      containerClassName: "gap-2",
      text: "text-base",
    },
  };
  return (
    <Link
      href="/"
      className={`flex items-center ${sizes[size]?.containerClassName} z-10`}
    >
      <Image
        src={LogoImg}
        height={sizes[size]?.height}
        width={sizes[size]?.width}
        alt="The Wild Oasis logo"
      />
      <span className={`${sizes[size]?.text} font-semibold text-primary-100`}>
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
