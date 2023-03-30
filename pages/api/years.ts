import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.years.findMany()

    res.status(200).json({ data })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    await prisma.$disconnect()
  }
}