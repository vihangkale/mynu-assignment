"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const src = searchParams.get("src");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const pathname = usePathname();
  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="m-auto relative rounded-lg modalContent w-full mx-0.5 bg-[#0c483e]">
            <div className="flex flex-col h-full">
              <Image
                src={src}
                className="w-full h-4/5 rounded-lg"
                width={100}
                height={200}
                alt="food item"
              />
              <div className="flex flex-col text-white p-3 h-1/5">
                <div className="flex justify-between w-full items-center">
                  <p className="text-base text-semibold">{name}</p>
                  <p className="text-sm text-semibold">{price}</p>
                </div>
                {description && (
                  <p className="text-white text-[13px] font-normal">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <Link href={pathname}>
              <button
                type="button"
                className="bg-[#282828ab] rounded-full p-2 text-white w-[40px] h-[40px] absolute top-[10px] right-[10px]"
              >
                &#10005;
              </button>
            </Link>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
