import Head from "next/head";
import Image from "next/image";
import CallIcon from "@material-ui/icons/Call";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import EmailIcon from "@material-ui/icons/Email";

function contact() {
    return (
      <div className="max-w-screen-2xl mx-auto lg:px-4">
        <Head>
          <title>Contact</title>
        </Head>
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          <div className="absolute w-full z-10 top-0 text-white h-full flex flex-col justify-center items-center px-2">
            <h2 className="text-[40px] md:text-[70px] lg:text-[80px] font-semibold tracking-widest">
              GET IN TOUCH
            </h2>
            <p className="tracking-wider font-normal text-xs sm:text-sm md:text-base text-center">
              Want to get in touch? We'd love to hear from you. Here's how you
              can reach us...
            </p>
          </div>
          <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
          <Image
            className="filter blur-xs"
            src="/images/contact.jpg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-3 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-center md:space-x-10 z-50">
          <div className="flex flex-col md:w-[400px] md:h-[400px] shadow-md space-y-5 items-center bg-white p-4 rounded-md md:hover:scale-105 transition transform duration-300 ease-out hover:shadow-lg">
            <CallIcon />
            <h2 className="font-medium tracking-wider text-sm md:text-base lg:text-lg">
              Talk to Sales
            </h2>
            <p className="text-center font-normal tracking-wide text-xs text-gray-600 md:text-sm lg:text-base">
              Just pick up the phone to chat with a member of our sales team.
            </p>
            <div className="flex flex-col space-y-3 text-sm md:text-base">
              <div className="flex items-center space-x-2 hover:text-green-500 transition duration-200 ease-out">
                <Image
                  src="/images/flags/nepal.png"
                  objectFit="contain"
                  width={30}
                  height={30}
                />
                <a href="tel:9779846712198">+9779846712198</a>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-500 transition duration-200 ease-out">
                <Image
                  src="/images/flags/australia.png"
                  objectFit="contain"
                  width={30}
                  height={30}
                />
                <a href="tel:61452162135">+61452162135</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:w-[400px] md:h-[400px] shadow-md space-y-5 items-center bg-white p-4 rounded-md md:hover:scale-105 transition transform duration-300 ease-out hover:shadow-lg">
            <ChatBubbleOutlineIcon />
            <h2 className="font-medium tracking-wider text-sm md:text-base lg:text-lg">
              Contact Customer Support
            </h2>
            <p className="text-center font-normal tracking-wide text-xs text-gray-600 md:text-sm lg:text-base">
              Sometimes you need a little help from your friends or a support.
              Don't worry ... we're here for you.
            </p>
            <a
              href="mailto:nepalilugaa@gmail.com"
              className="flex items-center p-4 space-x-2 border border-yellow-500 rounded-sm hover:bg-yellow-100 transition duration-200 ease-out"
            >
              <EmailIcon />
              <span className="font-medium tracking-wide text-sm md:text-base">
                Email
              </span>
            </a>
          </div>
        </div>
      </div>
    );
}

export default contact
