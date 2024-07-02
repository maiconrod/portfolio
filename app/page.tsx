import { HeroSection } from './components/pages/home/hero-section'
import { HighLightProjects } from './components/pages/home/highlighted-projects'
import {KnownTechs} from './components/pages/home/known-techs'
import { WorkExperience } from './components/pages/home/work-experience'
import { HomePageData } from './types/page-info'
import { fetchHygraphQuery } from './utils/fetch-hygraph-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Olá! Seja bem-vindo ao meu portfólio!',
  openGraph: {
    images: ['/images/imageOg.png'],
    authors: ['Maicon Rodrigues'],
  }
}

const getPageData = async (): Promise<HomePageData> => {
  const query = `
    query PageInfoQuery {
      page(where: {slug: "home"}) {
        introduction {
          raw
        }
        technologies {
          name
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        knownTechs {
          iconSvg
          name
          startDate
        }
        highlightProjects {
          slug
          thumbnail {
            url
          }
          title
          shortDescription
          technologies {
            name
          }
        }
      }
      workExperiences {
        companyLogo {
          url
        }
        role
        companyName
        companyUrl
        startDate
        endDate
        description {
          raw
        }
        technologies {
          name
        }
      }
    }
  `;

  return fetchHygraphQuery(query, 60 * 60 * 12);
}

export default async function Home() {
  const { page: pageData, workExperiences } = await getPageData()

  return (
    <>
      <HeroSection homeInfo={pageData} />
      <KnownTechs techs={pageData.knownTechs} />
      <HighLightProjects projects={pageData.highlightProjects} />
      <WorkExperience experiences={workExperiences}/>
    </>
  )
}
