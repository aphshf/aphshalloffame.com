import SubLinks from 'components/shared/SubLinks'
import SectionTitle from 'components/shared/SectionTitle'
import home from 'db/home.json'
import { Metadata } from 'next'
import MemberGallerySection from 'components/shared/MemberGallerySection'
import { getPageSEO } from 'utils/helpers'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSEO('/mission-statement')

  return {
    title: page?.title,
    description: page?.description,
  }
}

const MissionStatement = () => (
  <>
    <SubLinks />
    <div className="bg-gray-200 border-t-4 border-black">
      <SectionTitle title="Mission Statement" />
      <div
        className="py-6 px-7 mx-2 lg:mx-8 text-center content"
        dangerouslySetInnerHTML={{ __html: home?.missionStatement }}
      />
      <MemberGallerySection />
    </div>
  </>
)

export default MissionStatement
