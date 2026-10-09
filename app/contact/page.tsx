import dynamic from 'next/dynamic'
import contacts from 'db/contactMembers.json'
import PageTitle from 'components/shared/PageTitle'
import SectionTitle from 'components/shared/SectionTitle'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { getPageSEO } from 'utils/helpers'
import {
  CONTACT_TITLE,
  CONTACT_SUB_TITLE,
  CONTACT_MESSAGE,
} from 'utils/constants'

const ContactForm = dynamic(() => import('components/ContactForm'))

type Contact = (typeof contacts)[0]

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSEO('/contact')

  return {
    title: page?.title,
    description: page?.description,
  }
}

const Contact = () => (
  <>
    <PageTitle title={CONTACT_TITLE} />
    <SectionTitle title={CONTACT_SUB_TITLE} />
    <p className="text-lg font-black text-center my-4">{CONTACT_MESSAGE}</p>
    <ul className="flex flex-col max-w-xl mx-auto my-12">
      {contacts?.map((contact: Contact) => (
        <li
          key={contact?.name}
          className="bg-white shadow-lg mb-5 mx-4 sm:mx-0 rounded p-4 flex flex-row items-center"
        >
          <EnvelopeIcon className="text-gray-500 h-6 w-6 mr-6" />
          <p className="flex flex-col text-md font-bold">
            <span>{contact?.name}</span>
            <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
          </p>
        </li>
      ))}
    </ul>
    <ContactForm />
  </>
)

export default Contact
