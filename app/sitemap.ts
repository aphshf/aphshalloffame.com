import { MetadataRoute } from 'next'
import navigation from 'db/navigation.json'
import { SITE_URL } from 'utils/constants'
import members from 'db/members.json'
import ceremonies from 'db/ceremonies.json'

export async function generateCeremonyLinks() {
  return ceremonies.map((c) => ({
    url: `${SITE_URL}/ceremony/${c.ceremony}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))
}

export async function generateInducteeLinks() {
  return members.map((m) => ({
    url: `${SITE_URL}/inductee/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  }))
}

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // Menu items with children (Ceremonies) are dropdowns, not pages
  const siteLinks = navigation
    .filter((link) => !link.children)
    .map((link) => ({
      url: `${SITE_URL}${link?.url}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    }))

  const ceremonyLinks = await generateCeremonyLinks()
  const inducteeLinks = await generateInducteeLinks()

  //@ts-ignore
  return [
    //@ts-ignore
    ...siteLinks,
    //@ts-ignore
    ...ceremonyLinks,
    //@ts-ignore
    ...inducteeLinks,
  ]

  return []
}

export default sitemap
