// NextJS
import Image from "next/image";
// Components
/* import SignIn from "@/components/signIn";
import ContactUs from "@/components/contactUs"; */
// Logos
import awsLogo from "/public/logos/awsLogo@2x.svg";
import nextJS from "/public/logos/nextJsLogo@2x.svg";
import reactLogo from "/public/logos/reactLogo@2x.svg";
import tailwindcssLogo from "/public/logos/tailwindcssLogo@2x.svg";
// Icons
import {
  WatchLater as WatchLaterIcon,
  ListAlt as ListAltIcon,
  Equalizer as EqualizerIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

export default async function Home({ params }) {
  const icons = {
    WatchLaterIcon: (
      <WatchLaterIcon sx={{ color: "#7C58FF", fontSize: "50px" }} />
    ),
    ListAltIcon: <ListAltIcon sx={{ color: "#7C58FF", fontSize: "50px" }} />,
    EquilizerIcon: (
      <EqualizerIcon sx={{ color: "#7C58FF", fontSize: "50px" }} />
    ),
  };

  const Card = (props) => {
    const Icon = icons[props.icon];
    return (
      <div className="flex flex-col flex-1 gap-4">
        {Icon}
        <h4 className="text-white text-lg font-medium">{props.title}</h4>
        <h5 className="text-[#ffffff90]">{props.desc}</h5>
      </div>
    );
  };

  return (
    <>
      {/* Header Section */}
      {/* Hero section */}
      <section
        id="hero"
        className="flex justify-center h-screen items-center p-4"
        style={{ background: "linear-Gradient(#111113, #26223B)" }}
      >
        {/* Hero container */}
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-center text-white text-6xl">
              Where <span className="text-[#7C58FF]">precision</span> meets{" "}
              <span className="text-[#7C58FF]">productivity.</span>
            </h1>
            <h2 className="text-center text-lg text-[#ffffff90]">
              Seamless time tracking. Powerful insights.
            </h2>
            <div className="flex flex-row gap-4 items-center justify-center">
              {/* <SignIn />
              <ContactUs /> */}
            </div>
            <div className="mt-16">
              <p className="text-center text-sm text-[#ffffff90]">MADE WITH</p>
              <div className="flex justify-evenly mt-6 ">
                <Image alt="Made with React" height={35} src={reactLogo} />
                <Image alt="Made with NextJS" height={35} src={nextJS} />
                <Image
                  alt="Made with TailwindCSS"
                  height={35}
                  src={tailwindcssLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Overview section */}
      <section id="overview" className="flex justify-center bg-[#1A1727]">
        {/* Overview container */}
        <div className="flex flex-col gap-24 w-[1280px] h-full justify-center py-32 px-4">
          <div>
            <h2 className=" text-white text-3xl">
              Seamlessly Create, Organize, and Boost Productivity
            </h2>
            <h3 className="py-2 text-lg text-[#ffffff90]">
              Create, organize, and boost productivity with a built-in stopwatch
              for accurate time tracking and insightful graphs.
            </h3>
          </div>
          <div className="flex gap-8 bg-[#121212] rounded-lg p-12 border-line border-2 ">
            <Card
              title="Effortless Time Logging"
              desc="Create detailed entries and utilize our interactive stopwatch to effortlessly track and log your tasks with precision."
              icon="WatchLaterIcon"
            />
            <Card
              title="Organize Your Work"
              desc="Stay on top of your projects by creating separate jobs. Each job serves as a dedicated space to store and manage related entries seamlessly."
              icon="ListAltIcon"
            />
            <Card
              title="Visualize Your Progress"
              desc="Gain valuable insights into your productivity journey with our analytics section. Graphically visualize your progress to make informed decisions and optimize your workflow."
              icon="EquilizerIcon"
            />
          </div>
        </div>
      </section>
      {/* Footer section */}
      <section className="flex justify-center bg-[#121212]">
        {/* Footer container */}
        <div className="flex p-4 w-[1280px] h-full justify-between items-center">
          <p className="text-white">
            ©2023 | Made by{" "}
            <span className="text-[#7C58FF] font-medium">Abass Ibrahim</span>
          </p>
          <div className="flex gap-4">
            <a target="_blank" href="https://github.com/absibs">
              <GitHubIcon sx={{ color: "white", fontSize: "2.5rem" }} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/abass-ibrahim/"
            >
              <LinkedInIcon sx={{ color: "white", fontSize: "2.5rem" }} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
