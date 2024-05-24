import { Project } from "@/app/types/projects";
import Image from "next/image";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const technologies = project.technologies.map((x) => x.name).join(", ");
  return (
    <div className="rounded-lg h-[564px] md:h-[650px] sm:max-w-[730px] flex flex-col items-center bg-gray-800 overflow-hidden border-4 border-gray-800 hover:border-emerald-500 opacity-70 hover:opacity-100 pb-3 transition-all group mx-auto">
      <div className="w-full  overflow-hidden mx-auto">
        <Image
          width={300}
          height={200}
          unoptimized
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.title}`}
          className="w-full h-full object-cover object-center group-hover:scale-110 duration-500 transition-all rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col items-center p-8">
        <div className="w-full flex gap-2 items-center justify-start">
        <Image
            width={20}
            height={20}
            alt="Logo MrDev"
            src="/images/logo.svg"
          />
          <strong className="font-medium text-gray-50/90 group-hover:text-emerald-500 transition-all">
            {project.title}
          </strong>
        </div>
        <p className="mt-2 text-gray-400 line-clamp-4 text-start">
          {project.shortDescription}
        </p>
        <span className="text-gray-300 text-sm font-medium block mt-auto py-4 text-center">
          {technologies}
        </span>
      </div>
    </div>
  );
};
