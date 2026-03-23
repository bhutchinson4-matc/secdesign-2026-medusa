import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "MATC Store",
  description:
    "Finders keepers!",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />

      <section className="w-full bg-gray-50 py-24">
        <div className="content-container flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl mx-auto px-6">
          
          {/* Image */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2">
            <img
              src="/images/lost_and_found3.png"
              alt="Lost and Found Bin"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center text-center md:text-left w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Welcome to the MATC Lost & Found Store
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              Ever wonder where your lost hoodie or that one lonely sneaker disappears to?  
              Welcome to the MATC Lost & Found Store — where the finest forgotten belongings  
              are curated just for you. From designer hoodies to single socks with mysterious pasts,  
              each item tells a story (probably someone else’s).
            </p>
            <a href="/store">
              <button className="self-center md:self-start px-8 py-4 bg-gradient-to-r from-[#fd4a2b] to-[#ff7a59] text-white text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                Shop Now
              </button>
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
