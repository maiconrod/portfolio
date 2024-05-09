'use client'

import Link from 'next/link'
import ProjectCard from './project-card'
import { Project } from '@/app/types/projects'
import { motion } from 'framer-motion'
import { fadeUpAnimation } from '@/app/lib/animations'

type ProjectsListProps = {
  projects: Project[]
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-y-6">
      {projects?.map((project, index) => (
        <motion.div
        key={project.title}
        {...fadeUpAnimation}
        transition={{duration: 0.5, delay: index * 0.1}}
        >
          <Link  href={`/projects/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        </motion.div>
      ))}
    </section>
  )
}

export default ProjectsList;
