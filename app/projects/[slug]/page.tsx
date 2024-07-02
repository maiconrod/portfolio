import { ProjectDetails } from '@/app/components/pages/project/project-detail'
import { ProjectSections } from '@/app/components/pages/project/project-section'
import { ProjectPageData, ProjectPageStaticData } from '@/app/types/page-info'
import { fetchHygraphQuery } from '@/app/utils/fetch-hygraph-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type ProjectProps = {
  params: {
    slug: string
  }
}

const getProjectDetails = async (slug: string): Promise<ProjectPageData | null> => {
  const query = `
    query ProjectQuery() {
      project(where: {slug: "${slug}"}) {
        pageThumbnail {
          url
        }
        thumbnail {
          url
        }
        sections {
          title
          image {
            url
          }
        }
        title
        shortDescription
        description {
          raw
          text
        }
        technologies {
          name
        }
        liveProjectUrl
        githubUrl
      }
    }
  `
  try {
    const data = await fetchHygraphQuery<ProjectPageData>(query, 1000 * 60 * 60 * 24) // 1 day
    return data
  } catch (error) {
    console.error(`Error fetching project with slug '${slug}':`, error)
    return null
  }
}

export default async function Project({ params: { slug } }: ProjectProps) {
  const projectData = await getProjectDetails(slug)

  if (!projectData || !projectData.project || !projectData.project.title) {
    return {
      notFound: true,
    }
  }

  const { project } = projectData

  return (
    <>
      <ProjectDetails project={project} />
      <ProjectSections sections={project.sections} />
    </>
  )
}

export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery() {
      projects(first: 100) {
        slug
      }
    }
  `
  const { projects } = await fetchHygraphQuery<ProjectPageStaticData>(query)

  return projects
}

export async function generateMetadata({
  params: { slug },
}: ProjectProps): Promise<Metadata> {
  const projectData = await getProjectDetails(slug)

  if (!projectData || !projectData.project || !projectData.project.title) {
    throw new Error(`Project with slug '${slug}' not found or missing title.`)
  }

  const { project } = projectData

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}
