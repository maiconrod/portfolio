import HorizontalDivider from '@/app/components/divider/horizontal'
import { SectionTitle } from '@/app/components/section-title'
import ProjectCard from './project-card'
import Link from '@/app/components/link'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Project } from '@/app/types/projects'

type HighLightProjectsProps = {
  projects: Project[]
}

const HighLightProjects = ({ projects }: HighLightProjectsProps) => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle='destaques' title='Projetos em destaque' />
      <HorizontalDivider className="mb-16" />
      <div>
        {projects?.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            <HorizontalDivider className="my-16" />
          </div>
        ))}

        <p className="flex items-center gap-1.5">
          <span className="text-gray-400">Se interessou?</span>
          <Link
            href='https://github.com/maiconrod?tab=repositories'
            target='_blank'
            className='inline-flex'
          >
            Ver Todos
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  )
}

export default HighLightProjects;
