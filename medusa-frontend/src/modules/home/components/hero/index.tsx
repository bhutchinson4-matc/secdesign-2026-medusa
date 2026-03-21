import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full relative bg-gradient-to-r from-[#3F68C0] via-[#5A7BCB] to-[#6686CC] overflow-hidden">
      {/* Centering container */}
      <div className="flex h-full items-center justify-center px-6">
        {/* Row container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 h-full w-full max-w-6xl">
          
          {/* Text container */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left h-full w-full md:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg font-sans">
              MATC Lost & Found Store
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl text-gray-100 max-w-md md:max-w-lg leading-relaxed drop-shadow-sm">
              New items available every Monday!
            </p>

            {/* CTA button */}
            <a href="/store">
            <button className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#fd4a2b] to-[#ff7a59] text-white text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-auto">
              Shop Now
            </button>
            </a>
          </div>

          {/* Image container */}
          <div className="flex items-center justify-center h-48 sm:h-64 md:h-[80%] w-full md:w-auto mt-8 md:mt-0">
            <img
              src="/images/matc_logo.png"
              alt="MATC Logo"
              className="h-full w-auto object-contain transform transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </div>

      {/* Optional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none"></div>
    </div>
  )
}

export default Hero
