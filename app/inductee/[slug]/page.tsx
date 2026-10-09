import Image from 'next/image'
import PageTitle from 'components/shared/PageTitle'
import { Metadata } from 'next'
import members from 'db/members.json'
import cloudinary from 'utils/cloudinary'
import { adjustProfileImageSize, generateMemberMetaData } from 'utils/helpers'

async function getMember(slug) {
  const findMember = members.filter((m) => m.slug === slug)

  if (findMember.length > 0) {
    const member = findMember[0]

    const request = await cloudinary.search
      .expression(member?.slug)
      .execute()
      .then((res) => res.resources)

    let profileImage = {
      src: request[0]?.secure_url.replace('png', 'webp').replace('jpg', 'webp'),
      width: request[0]?.width,
      height: request[0]?.height,
      alt: request[0]?.filename,
    }

    return { member, profileImage }
  }
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const results = await getMember(params?.slug)
  const member = results?.member

  return generateMemberMetaData(member?.name, member?.class, member?.inducted)
}

export async function generateStaticParams() {
  return members.map((c) => `/inductee/${c.slug}`)
}

const Inductee = async ({ params: { slug } }) => {
  const results = await getMember(slug)
  const member = results?.member
  const profileImage = results?.profileImage

  const { width, height } = await adjustProfileImageSize(
    profileImage?.width,
    profileImage?.height,
  )
  const altName = member?.name as string

  return (
    <>
      <PageTitle title="Profile" />
      <div className="bg-gray-200 my-0 mx-8 p-2">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            {profileImage && width && height && (
              <div className="bio-profile-img flex-col lg:float-right lg:mt-20 lg:mb-6 lg:mx-6">
                <Image
                  src={profileImage?.src}
                  alt={altName}
                  width={width}
                  height={height}
                  priority
                />
              </div>
            )}
            <h3 className="my-6">
              <strong className="font-serif text-site-darkBlue text-4xl">
                {member?.name}
              </strong>
            </h3>
            <div className="block p-4 w-full bg-site-lightBlue w-full lg:w-1/2">
              <p className="p-0 m-0 font-serif text-white text-xl">
                <span className="mr-4">
                  <strong>Class:</strong> {member?.class}
                </span>
                <strong>Inducted:</strong> {member?.inducted}
              </p>
            </div>
            <div className="w-full">
              <span
                className="py-4 px-4 content"
                dangerouslySetInnerHTML={{
                  __html: member?.biography as string,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inductee
