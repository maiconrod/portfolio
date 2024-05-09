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
      className="flex flex-col justify-center lg:items-center gap-6 lg:gap-12 lg:flex-row"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-full sm:h-[400px] lg:w-[420px] lg:min-h-full sm:flex sm:justify-center"
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
          className="w-full sm:max-w-[520px] h-full object-cover rounded-lg border border-gray-700"
        />
      </motion.div>
      <div className="md:flex-1 lg:py-[18px]">
        <motion.h3
          className="flex items-center justify-center lg:justify-start gap-3 font-medium text-lg text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={20}
            height={20}
            alt=""
            src="/images/logo.svg"
          />
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-400 my-6 sm:mx-10 md:mx-0 text-center lg:text-left"
          {...fadeUpAnimation}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          {project.shortDescription}
        </motion.p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px] justify-center lg:justify-start">
          {project.technologies?.map((tech, index) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{duration: 0.2, delay: 0.5 + index * 0.1}}
            />
          ))}
        </div>
        <Link
        href={`/projects/${project.slug}`}
        target="_blank"
        className="flex justify-center"
        >
          Ver projeto
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
