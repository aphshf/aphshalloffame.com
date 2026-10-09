import members from 'db/members.json'
import MemberGallery from './MemberGallery'

// Server component: send the gallery only the fields it renders, not every biography
const galleryMembers = members.map(({ slug, name, lastName, inducted }) => ({
  slug,
  name,
  lastName,
  inducted,
}))

const MemberGallerySection = () => <MemberGallery allMembers={galleryMembers} />

export default MemberGallerySection
