import { FaGithub, FaGooglePlay, FaYoutube } from "react-icons/fa";
import { ImSphere } from "react-icons/im";
import Header from "./components/Header";
import { Projects } from "./components/Projects";
import WavingHand from "./components/WavingHand";
export default function Home() {
  const projects = [
    {
      id: "1",
      title: "AZ English",
      subtitle: "A cross-platform mobile application for learning English",
      description:
        "AZ English is a cross-platform mobile application for learning English. It is built using Flutter and Firebase. The application is designed to help users learn English by providing them with a variety of features such as quizzes, flashcards, and more. The application also includes a social feature that allows users to connect with other learners and practice their English skills together.",
      imageUrl: "/images/practice.png",
      linkIcons: [
        {
          link: "https://github.com/bigb45/az-english/",
          icon: <FaGithub size={32} />,
        },
        {
          link: "https://play.google.com/store/apps/details?id=com.evirgen.azenglish&hl=en",
          icon: <FaGooglePlay size={32} />,
        },
      ],
      technologies: ["Flutter", "Firebase", "Dart", "Python", "Figma", "Git"],
    },
    {
      id: "2",
      title: "Foodeck",
      subtitle: "Foodeck, THE food ordering app",
      description:
        "Foodeck is a food ordering app that allows users to order food from their favorite restaurants. The app is built using Flutter and Express.JS and includes features such as user authentication, restaurant listings, food ordering, and more. The app is designed to be easy to use and intuitive, making it the perfect choice for anyone looking to order food online.",
      imageUrl: "/images/foodeck.jpg",
      linkIcons: [
        {
          link: "https://github.com/bigb45/foodeck",
          icon: <FaGithub size={32} />,
        },
      ],
      technologies: ["Kotlin", "Express.JS", "Javascript", "Figma", "Git"],
    },
    {
      id: "3",
      title: "Formally",
      subtitle: "Build forms, manage users and organizations with Formally",
      description:
        "Formally is a SaaS webapp targeted towards businesses and organizations. It allows users to create forms, manage users and organizations, and more. The app is built using React, Node.js, and PlanetScale and includes features such as user authentication, form creation, AI question generation, and more.",
      imageUrl: "/images/formally.png",
      linkIcons: [
        {
          displayUrl: "app.clique.team",
          link: "https://app.clique.team",
          icon: <ImSphere size={32} />,
        },
      ],
      technologies: ["React", "Supabase", "Figma"],
    },
    {
      id: "4",
      title: "Ecopoly",
      subtitle:
        "EcoPoly: The Green Property Game! Buy lands and Plant forests with friends online!",
      description:
        "A pass-and-play mobile game where you compete against your friends to build green cities and plant trees. Landing on a city with many trees will cost you! Buy sustainable energy companies and bike lanes, If you land on a tax card you have to pay an Environmental Tax! Trade properties with your friends and build your Own Green Empire!",
      imageUrl: "/images/ecopoly.jpg",
      linkIcons: [
        {
          link: "https://github.com/bigb45/ecopoly",
          icon: <FaGithub size={32} />,
        },
        {
          displayUrl: "youtube.com/watch?BzpH4am1jtw",
          link: "https://youtu.be/BzpH4am1jtw",
          icon: <FaYoutube size={32} />,
        },
      ],
      technologies: ["Flutter", "Dart", "Figma"],
    },
  ];

  return (
    <div className="font-grotesk select-none">
      <Header />
      <main className="flex min-h-screen h-full bg-gradient-to-tr from-[#fee4dc] to-[#bdadf9] flex-col  items-center justify-start">
        <div className="w-full px-80 mt-24">
          <div className="flex lg:flex-row sm:flex-col md:flex-col justify-between items-center mb-10">
            <div>
              <div className="text-6xl font-bold">
                Hello, I&apos;m{" "}
                <span className="text-[#fd6463] underline decoration-wavy decoration-[#fdfcf1] underline-offset-8">
                  Mohammed
                </span>{" "}
                <WavingHand />
              </div>

              <div className="max-w-prose text-slate-500">
                <br />I am a junior mobile developer 📱 with a passion for
                creating beautiful applications. I am currently working on a few
                projects. take a look at my work below. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Necessitatibus, itaque, fuga
                aut nam laboriosam deserunt odio eum sunt temporibus doloribus
                nesciunt. Perferendis, vitae? Minus quas, minima odit
                consectetur reiciendis nemo vitae qui. Labore voluptates enim
                perspiciatis et minus porro repudiandae eius omnis, nihil
                dignissimos nostrum explicabo laborum quod inventore accusamus.
              </div>
            </div>
            <div className="bg-black">
              <div className="w-[300px] h-[300px] overflow-clip hover:translate-x-[-10px] hover:translate-y-[-10px] transition-all duration-200">
                <img src="/images/me.jpg" alt="profile" draggable={false} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-start mb-10">
            <div>
              <div className="text-6xl font-bold mb-10">
                My Projects <span className="text-[#fd6463]">🚀</span>
              </div>
            </div>
            <Projects projects={projects}></Projects>
          </div>
          {/* <div className="w-full flex text-6xl justify-start font-bold mb-10">
            Contact Me <span className="text-[#fd6463]">📞</span>
          </div> */}
        </div>
        {/* <div className="absolute bottom-0 w-full flex flex-col justify-between">
          <MovingTape></MovingTape>
        </div> */}
      </main>
    </div>
  );
}
