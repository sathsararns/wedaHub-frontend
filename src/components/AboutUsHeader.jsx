import React, { useEffect, useState } from 'react'

function AboutUsHeader() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')`,
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-0"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex flex-col justify-center px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-6">
            {/* Furniture shop text */}
            <p className={`transition-all duration-700 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } text-teal-400 font-medium tracking-wider`}>
              DISTRIBUTION SERVICES
            </p>
            {/* About us heading */}
            <h1 className={`transition-all duration-700 ease-out transform delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } text-5xl md:text-6xl lg:text-7xl font-bold text-white`}>
              ABOUT 
            </h1>
            {/* Subtitle */}
            <p className={`transition-all duration-700 ease-out transform delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } text-lg md:text-xl text-white/90 max-w-2xl`}>
              Trusted By Over 150,000 Local Providers since 2010
            </p>
            {/* Divider line */}
            <div className={`transition-all duration-700 ease-out transform delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } w-24 h-1 bg-teal-400 my-4`}></div>
            {/* Breadcrumb */}
            <div className={`transition-all duration-700 ease-out transform delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } flex items-center space-x-2 text-sm md:text-base`}>
              <a
                href="#"
                className="text-teal-400 hover:text-teal-300 transition-colors flex items-center"
              >
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                Home
              </a>
              <span className="text-white/70">»</span>
              <span className="text-white">About</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsHeader