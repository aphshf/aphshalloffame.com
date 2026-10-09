import PageTitle from 'components/shared/PageTitle'
import donate from 'db/donate.json'
import SectionTitle from 'components/shared/SectionTitle'
import { Metadata } from 'next'
import { getPageSEO } from 'utils/helpers'
import { DONATE_TITLE, DONATE_SUB_TITLE } from 'utils/constants'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSEO('/donate')

  return {
    title: page?.title,
    description: page?.description,
  }
}

const Donate = () => (
  <>
    <PageTitle title={DONATE_TITLE} />
    <div className="mx-2 lg:mx-8 py-4">
      <SectionTitle title={DONATE_SUB_TITLE} />
      <br />
      {donate?.map((donate) => (
        <span key={donate?.content}>
          <div
            className="content mb-8"
            dangerouslySetInnerHTML={{ __html: donate?.content }}
          />
          <a
            href={donate?.btnUrl}
            className="mt-3 mb-8 block text-center text-xl text-white bg-green-700 hover:bg-green-600 px-4 py-2 rounded"
            download
            style={{
              maxWidth: 225,
            }}
          >
            {donate?.btnLabel}
          </a>
        </span>
      ))}
    </div>
  </>
)

export default Donate
