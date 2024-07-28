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
      githubLink: "https://github.com/bigb45/az-english/",
    },
    {
      id: "2",
      title: "",
      subtitle: "This is a description of project 1",
      description: "This is a description of project 1",
      imageUrl: "/images/practice.png",
      githubLink: "https://example.com",
    },
    {
      id: "3",
      title: "Project 1",
      subtitle: "This is a description of project 1",
      description: "This is a description of project 1",
      imageUrl: "/images/practice.png",
      githubLink: "https://example.com",
    },
    {
      id: "4",
      title: "Project 1",
      subtitle: "This is a description of project 1",
      description: "This is a description of project 1",
      imageUrl: "/images/practice.png",
      githubLink: "https://example.com",
    },
  ];

  return (
    <div className="font-grotesk select-none">
      <Header />
      <main className="flex min-h-screen h-full bg-gradient-to-tr from-[#fee4dc] to-[#bdadf9] flex-col  items-center justify-start">
        <div className="w-full px-80 mt-24">
          <div
            className="flex lg:flex-row sm:flex-col md:flex-col justify-between items-center mb-10"
            id="#"
          >
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
              <div className="w-[300px] h-[300px] hover:translate-x-[-10px] hover:translate-y-[-10px] transition-all duration-200">
                <img
                  src="/images/placeholder.png"
                  alt="profile"
                  draggable={false}
                />
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
            {/* <div className="grid grid-cols-3 grid-rows-2 bg-black ">
              {Array(6)
                .fill(1)
                .map((i) => (
                  <div
                    key={i}
                    className="cursor-pointer border-black bg-black border-2 w-80 h-80 hover:translate-x-[-10px] hover:translate-y-[-10px]  transition-all duration-200 flex justify-center items-center text-white overflow-hidden "
                  >
                    <img src="images/practice.png" />
                  </div>
                ))}
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}
