import { NextResponse } from 'next/server'
import { getDB } from '@/db'
import { passKeyCredentialTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import isProd from '@/utils/is-prod'
import { SITE_NAME, SITE_DOMAIN } from '@/constants'
import type { AuthenticatorTransport } from '@simplewebauthn/types'

const rpName = SITE_NAME
const rpID = isProd ? SITE_DOMAIN : 'localhost'

interface OptionsRequest {
  userId: string
  email: string
}

export async function POST(request: Request) {
  const { userId, email } = (await request.json()) as OptionsRequest

  const { generateRegistrationOptions } = await import('@simplewebauthn/server')

  const db = getDB()
  const existingCredentials = await db.query.passKeyCredentialTable.findMany({
    where: eq(passKeyCredentialTable.userId, userId),
  })

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: Buffer.from(userId),
    userName: email,
    attestationType: 'none',
    excludeCredentials: existingCredentials.map((cred) => ({
      id: cred.credentialId,
      type: 'public-key',
      transports: cred.transports
        ? (JSON.parse(cred.transports) as AuthenticatorTransport[])
        : undefined,
    })),
  })

  return NextResponse.json(options)
}
