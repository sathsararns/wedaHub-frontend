import React, { useState, useEffect, useRef } from 'react'

function FAQSection() {
  const [faqs, setFaqs] = useState([
  {
    question: 'How do I find service providers near my location?',
    answer:
      'Simply enter your location or allow location access, and our platform will display verified service providers available in your area.',
    isOpen: false,
  },
  {
    question: 'What types of services are available on the platform?',
    answer:
      'Our platform connects users with various service providers including electricians, plumbers, carpenters, cleaners, technicians, and other local professionals.',
    isOpen: false,
  },
  {
    question: 'How are service providers assigned to customers?',
    answer:
      'Service requests are distributed based on location, availability, service category, and provider ratings to ensure fast and reliable service.',
    isOpen: false,
  },
  {
    question: 'Are the service providers verified?',
    answer:
      'Yes. All providers go through a verification process before joining the platform to ensure quality, reliability, and customer safety.',
    isOpen: false,
  },
])

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          return {
            ...faq,
            isOpen: !faq.isOpen,
          }
        }
        return faq
      }),
    )
  }

  return (
    <div ref={sectionRef} className="w-full bg-white px-4 py-16 md:px-8 lg:px-16 xl:px-24">
      {/* Main FAQ Section */}
      <div className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-2">
          FAQs
        </h1>
        <p className="text-center text-gray-600 mb-12">
           Find answers to common questions about our location-based service platform
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <button
                className="flex justify-between items-center w-full py-5 text-left focus:outline-none hover:bg-gray-50 rounded-lg px-4 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-6 flex-shrink-0 text-gray-900">
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${faq.isOpen ? 'transform rotate-45' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${faq.isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
              >
                <p className="text-gray-600 px-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div
        className={`max-w-4xl mx-auto mt-20 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          transitionDelay: isVisible ? '400ms' : '0ms'
        }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-6">
          Contact us for more assistance and help
        </p>
        <button
          type="submit"
          className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#2210F0] hover:bg-[#2210F0] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
        >
          Contact Support
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FAQSection