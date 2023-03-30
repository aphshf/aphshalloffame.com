import SubLinks from 'components/shared/SubLinks'
import MemberGallery from 'components/shared/MemberGallery'
import home from 'db/home.json'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asbury Park High School Hall of Fame',
  description:
    'Welcome to the Asbury Park High School Distinguished Alumni Hall of Fame. Our mission is to recognize and honor those APHS graduates who as adults in many different and varied fields.',
}

const Home = () => (
  <>
    <SubLinks />
    <div
      className="bg-no-repeat bg-center bg-cover bg-welcome-banner z-30 flex justify-center items-center border-t-4 border-black"
      style={{ height: 526 }}
    >
      <div className="bg-black bg-opacity-70 w-full">
        <p className="text-white text-5xl drop-shadow sm:text-7xl font-bold text-center p-6">
          Asbury Park High School Distinguished Alumni Hall of Fame
        </p>
      </div>
    </div>
    <div className="bg-gray-200 mx-2 lg:mx-8 py-8">
      <div
        className="py-4 px-7 text-center content"
        dangerouslySetInnerHTML={{ __html: home?.latest }}
      />
      <MemberGallery />
    </div>
  </>
)

export default Home