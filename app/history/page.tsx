import SubLinks from 'components/shared/SubLinks'
import SectionTitle from 'components/shared/SectionTitle'
import home from 'db/home.json'
import { Metadata } from 'next'
import MemberGallerySection from 'components/shared/MemberGallerySection'
import { getPageSEO } from 'utils/helpers'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSEO('/history')

  return {
    title: page?.title,
    description: page?.description,
  }
}

const History = () => (
  <>
    <SubLinks />
    <div className="bg-gray-200 border-t-4 border-black">
      <SectionTitle title="History" />
      <div
        className="py-6 px-7 text-center content"
        dangerouslySetInnerHTML={{ __html: home?.history }}
      />
      <MemberGallerySection />
    </div>
  </>
)

export default History
