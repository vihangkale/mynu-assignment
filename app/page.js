import Image from "next/image";
import Link from "next/link";

async function getFoodData() {
  const response = await fetch(
    "https://m.mynu.app/api/v1/menu/63b6d425a48f92038192b264?language=en&menuType=dining"
  );
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const data = await getFoodData();
  const result = data?.result;
  const banners = result?.banners;
  const categories = result?.categories;
  const formatText = (text) => text.replaceAll("%20", " ");
  const formatPrice = (price) => {
    const parsed = String(price);
    const isLenghtMoreThan3 = parsed.length > 3;
    if (isLenghtMoreThan3) {
      const text = `${parsed.slice(0, -3)},${parsed.slice(-3)}`;
      return text;
    }
    return price;
  };
  return (
    <main className="min-h-screen pt-4 bg-[#0c483e]">
      <h1 className="text-3xl font-bold text-center text-white">Food Menu</h1>
      <div className="flex items-center gap-x-4 mt-4 overflow-auto px-4 py-2">
        {categories?.map(({ _id, name, image_sm }) => (
          <Link href={`#${_id}`} key={_id}>
            <div className="flex flex-col gap-y-2" key={_id}>
              <Image
                className="min-w-[100px] min-h-[70px] max-h-[70px] object-cover"
                src={image_sm}
                alt="category"
                width={100}
                height={70}
              />
              <p className="text-white font-semibold text-sm text-center text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                {formatText(name)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="content mt-2 overflow-y-auto px-4">
        <div>
          {banners?.map((banner) => (
            <div key={banner}>
              <Image
                className="rounded-lg"
                src={banner}
                width={500}
                height={302.5}
                alt="banner"
              />
            </div>
          ))}
        </div>
        {categories?.map(({ _id, name, items, image_sm }) => (
          <div key={_id} className="mt-3" id={_id}>
            <p className="text-2xl font-semibold text-white">
              {formatText(name)}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {items?.map(({ _id, images, price, name, description }) => {
                const src = images[0]?.url ? images[0]?.url : image_sm;
                return (
                  <Link
                    href={`?modal=true&src=${src}&name=${formatText(
                      name
                    )}&price=${formatPrice(price)}&description=${description}`}
                  >
                    <div
                      key={_id}
                      className="flex flex-col h-[178.5px] item-card rounded-lg"
                    >
                      <Image
                        className="w-full max-h-[120px] rounded-lg"
                        src={src}
                        alt="item"
                        width={188}
                        height={120}
                      />
                      <div className="p-2">
                        <p className="text-white font-semibold text-sm">
                          {formatText(name)}
                        </p>
                        <hr className="border-[#ffffff1f]" />
                        <p className="text-white font-semibold text-sm">
                          {formatPrice(price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
