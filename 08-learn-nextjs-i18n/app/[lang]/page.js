import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
