import dynamic from 'next/dynamic'
import PageTitle from 'components/shared/PageTitle'
import cloudinary from 'utils/cloudinary'
import { Metadata } from 'next'
import ceremonies from 'db/ceremonies.json'
import { generateCeremonyMetaData } from 'utils/helpers'

const GalleryGrid = dynamic(() => import('components/GalleryGrid'), {})
const GallerySlider = dynamic(() => import('components/GallerySlider'))

const getPhotos = async (year) => {
  const request = await cloudinary.api
    .resources({
      resource_type: 'image',
      type: 'upload',
      prefix: `site/ceremonies`,
      max_results: 500,
      context: true,
    })
    .then((res) => res.resources)

  /** Serialize the response */
  const photos = request
    .filter(({ public_id }) => public_id.includes(year))
    .map(({ height, width, secure_url }) => ({
      height,
      width,
      // Let Cloudinary pick the format (WebP/AVIF) and compression level
      src: secure_url.replace('/image/upload/', '/image/upload/f_auto,q_auto/'),
    }))
    .sort((a, b) => {
      if (b.height < b.width) {
        return 1
      }
      return -1
    })
    .map((photo, index) => ({
      ...photo,
      altText: `${year} induction ceremony, photo ${index + 1}`,
    }))

  return photos
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const year = params.year

  return generateCeremonyMetaData(year)
}

export async function generateStaticParams() {
  return ceremonies.map((c) => `/ceremony/${c.ceremony}`)
}

const Ceremony = async ({ params: { year } }) => {
  const photos = await getPhotos(year)

  return (
    <>
      <PageTitle title={`Ceremony: ${year}`} />
      <div className="bg-gray-200 my-0 mx-8 p-2">
        <GallerySlider photos={photos} />
        <GalleryGrid year={year} slides={photos} />
      </div>
    </>
  )
}

export default Ceremony
