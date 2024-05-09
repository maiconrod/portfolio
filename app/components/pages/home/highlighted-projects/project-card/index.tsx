"use client";

import Link from "@/app/components/link";
import TechBadge from "@/app/components/tech-badge";
import { Project } from "@/app/types/projects";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeUpAnimation, techBadgeAnimation } from "@/app/lib/animations";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {

  return (
    <motion.div
      className="flex flex-col justify-center items-center gap-6 lg:gap-12 lg:flex-row"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-full mx-auto flex flex-col items-center justify-center md:block"
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Image
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.title}`}
          width={420}
          height={304}
          className="w-[250px] h-[250px] sm:h-[420px] sm:w-[420px] object-cover rounded-lg sm:mb-10 "
        />
      </motion.div>
      <div className="mx-auto flex flex-col items-center justify-center md:block">
        <motion.h3
          className="flex items-center gap-3 font-medium text-lg text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={20}
            height={20}
            alt=""
            src="/images/icons/project-title-icon.svg"
          />
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-400 my-6 sm:mx-10 md:mx-0 text-center md:text-left"
          {...fadeUpAnimation}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {project.shortDescription}
        </motion.p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies?.map((tech, index) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{duration: 0.2, delay: 0.5 + index * 0.1}}
            />
          ))}
        </div>
        <Link href={`/projects/${project.slug}`} target="_blank">
          Ver projetos
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
