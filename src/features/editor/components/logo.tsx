import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={"/"}>
      <div className="size-8 relative shrink-0">
        <Image
          src={"/company-logo.svg"}
          fill
          alt="Bambi"
          className="shrink-0 hover:opacity-75 transition "
        />
      </div>
    </Link>
  );
};

export default Logo;
