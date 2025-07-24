import { withTimeout } from './with-timeout'

export async function fetchR2Object(bucket: R2Bucket, key: string) {
  try {
    return await withTimeout(bucket.get(key), 2000)
  } catch (error) {
    console.error('R2 fetch error:', error)
    return 'Hiba történt a fájl betöltésénél'
  }
}
