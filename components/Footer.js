import Image from "next/image";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#ececec] text-sm md:text-base text-gray-900 flex flex-col md:items-center md:justify-center px-3 py-4">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-10 lg:space-x-[100px]">
        <div className="flex flex-col space-y-1">
          <h4 className="font-medium tracking-wide">Payment Methods</h4>
          <div className="flex items-center gap-x-2 px-1 rounded-sm">
            <Image
              src="/images/payments/esewa.png"
              objectFit="contain"
              width={70}
              height={70}
            />
            <Image
              src="/images/payments/khalti.png"
              objectFit="contain"
              width={70}
              height={70}
            />
            <Image
              src="/images/payments/nabil.png"
              objectFit="contain"
              width={70}
              height={70}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <h4 className="font-medium tracking-widest">Lugaaa International</h4>
          <div className="flex items-center gap-x-2">
            <Image
              src="/images/flags/nepal.png"
              objectFit="contain"
              width={40}
              height={40}
            />
            <Image
              src="/images/flags/australia.png"
              objectFit="contain"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="flex flex-col space-y-1">
            <h4 className="font-medium tracking-wide">Follow Us</h4>
            <div className="flex items-center space-x-2">
              <Link href="https://www.facebook.com/Lugaaa-102952082276408/">
                <a target="_blank">
                  <FacebookIcon />
                </a>
              </Link>
              <Link href="https://www.instagram.com/lugaaa7/">
                <a target="_blank">
                  <InstagramIcon />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-medium tracking-widest">Lugaaa</h4>
            <div className="font-normal tracking-wide">
              <p>
                <Link href="/about">
                  <a className="hover:underline">About us</a>
                </Link>
              </p>
              <p>
                <Link href="/contact">
                  <a className="hover:underline">Contact us</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 text-center text-xs md:text-sm font-medium tracking-wide text-gray-800">
        &copy; Copyright Lugaaa. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
