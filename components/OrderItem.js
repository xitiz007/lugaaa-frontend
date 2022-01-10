import Link from "next/link";
import Image from "next/image";

function OrderItem({item}) {
    return (
    <>
      <div className="my-4 py-1 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-2">
          <Image
            src={item.image.url}
            height={150}
            width={150}
            objectFit="contain"
          />
          <div>
            <Link href={`/product/${item._id}`}>
                <a>
                <p className="text-base tracking-wide md:text-lg hover:underline font-medium">
                    {item.title}
                </p>
                </a>
            </Link>
            <p className="text-xs font-medium text-gray-600">
                <span className="mr-2">category:</span>
                {item.category.name}
            </p>
            <p className="text-xs font-medium text-gray-600">
                <span className="mr-2">sex: </span>
                {item.gender}
            </p>
            <p className="text-xs font-medium text-gray-600 flex space-x-3">
                <div>
                <span className="mr-2">size: </span>
                {item.productSize.size}
                </div>
                <span>|</span>
                <div>
                <span className="mr-2">color: </span>
                {item.productSize.color.colorName}
                </div>
            </p>
            <p className="text-xs my-2 line-clamp-3 text-gray-600">
                {item.description}
            </p>
            <p className="font-medium text-base md:text-lg">
                Rs.{item.productSize.price}
            </p>
          </div>
        </div>

        <div className="md:min-w-[200px] mt-2 md:mt-0 font-medium text-sm md:text-base">
          {item.quantity}
          {" X Rs."}
          {item.productSize.price}
          {" = Rs."}
          {item.productSize.price * item.quantity}
        </div>
      </div>
      <div className="border-b-2">

      </div>
      </>
    );
}

export default OrderItem
