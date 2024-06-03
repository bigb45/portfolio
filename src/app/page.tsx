export default function Home() {
  const projects = [
    {
      name: "Project 1",
      description: "This is a description of project 1",
      image: "https://via.placeholder.com/150",
      link: "https://example.com",
    },
    {
      name: "Project 2",
      description: "This is a description of project 2",
      image: "https://via.placeholder.com/150",
      link: "https://example.com",
    },
    {
      name: "Project 3",
      description: "This is a description of project 3",
      image: "https://via.placeholder.com/150",
      link: "https://example.com",
    },
    {
      name: "Project 4",
      description: "This is a description of project 4",
      image: "https://via.placeholder.com/150",
      link: "https://example.com",
    },
  ];
  return (
    <div>
      <div className="z-10 absolute flex-col flex items-center justify-center w-full h-full bg-black/50 text-lg text-white">
        <div className="w-full h-10 bg-yellow-400 overflow-clip flex items-center gap-10 border-black border-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key="i" className="bg-black h-20 w-4 rotate-45 gap-2 "></div>
          ))}
        </div>
        <p>THIS PAGE IS UNDER CONSTRUCTION</p>
      </div>
      <main className="flex min-h-screen h-full flex-col  items-center justify-start p-24">
        <a className="text-2xl">
          Hello 👋 <br />I am a junior mobile developer with a passion for
          creating beautiful and functional applications. I am currently working
          on a few projects. take a look at my work below.
        </a>
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="p-10 shadow-lg text-white rounded-lg bg-slate-400"
            >
              {project.name}
            </div>
          ))}
          so right now I&apos;m finishing up my Bachelor&apos;s, I haven&apos;t
          had time to work on my portfolio :&#40;
          <br />
          coming soon!
        </div>
      </main>
    </div>
  );
}
