import Head from "next/head";
import Image from "next/image";

function about() {
  return (
    <div className="max-w-screen-2xl mx-auto lg:px-4">
      <Head>
        <title>About</title>
      </Head>
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <div className="absolute w-full h-24 bg-gradient-to-b from-gray-100 to-transparent top-0 z-20" />
        <div className="absolute w-full z-10 top-0 text-right text-[#ffea00] px-4 md:px-10 mt-2">
          <h2 className="text-[40px] md:text-[70px] lg:text-[80px] font-semibold tracking-widest">
            Hi! We're
          </h2>
          <h2 className="text-[30px] md:text-[60px] lg:text-[70px] font-semibold tracking-widest">
            Lugaaa
          </h2>
          <div className="tracking-wide text-xs sm:text-sm md:text-base font-medium bg-gray-700 bg-opacity-50 inline-block">
            <p>online shopping.</p>
            <p>no makeup,</p>
            <p>no pants,</p>
            <p>no problem.</p>
          </div>
        </div>
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        <Image src="/images/fashion.jpg" layout="fill" objectFit="cover" />
      </div>
      <section className="bg-white about px-3 text-justify">
        <h3 className="text-lg md:text-2xl font-medium text-center p-4 tracking-wider">
          About Us
        </h3>
        <div className="flex flex-col space-y-4 text-gray-500 text-sm md:text-base">
          <p>
            Lugaaa is an ecommerce clothing store providing you authentic products all over the nepal. Lugaa is currently in Nepal and will be soon in australia.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            dolorem velit earum ipsam nam consequatur architecto aperiam, modi
            et labore neque temporibus sequi laudantium distinctio facilis odio
            iure molestiae officiis reiciendis excepturi incidunt fugiat
            aliquam. Numquam quo dolor eveniet ea. Molestiae voluptatum laborum
            iusto obcaecati numquam eveniet accusamus ea corporis! Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Rerum illum quia atque
            nihil ex facilis est vero debitis velit excepturi quae numquam
            officia, molestias ea veniam eligendi error quasi cupiditate
            possimus perferendis eos aliquid? Quia, facere temporibus ea
            corrupti repudiandae inventore, optio harum laborum, repellendus eum
            labore! Corporis, architecto? Eaque sequi doloribus iusto non
            molestiae voluptatem similique quasi maxime! Provident?
          </p>
        </div>
      </section>
    </div>
  );
}

export default about;
