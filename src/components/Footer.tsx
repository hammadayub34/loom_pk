import Image from "next/image";
import { DISCIPLINES } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-[#2c1053] pt-20 pb-16">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <hr className="thread-rule" />

        <div className="mt-14 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/loom_mark.png"
              alt="LOOM"
              width={2083}
              height={1158}
              className="h-12 w-auto shrink-0"
            />
            <p className="heading max-w-xs text-xl text-white">
              Where every brand becomes stronger.
            </p>
          </div>

          <p className="label text-white/40">{DISCIPLINES.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
