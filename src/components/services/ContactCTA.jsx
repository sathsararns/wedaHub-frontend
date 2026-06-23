import React from 'react'

function ContactCTA() {
  return (
    <section className="w-full bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto bg-[#0b1736] rounded-2xl px-8 md:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-white text-xl font-bold mb-1">
            Don't see the service you need?
          </h3>
          <p className="text-gray-300 text-sm">
            Contact us and we'll help you.
          </p>
        </div>
        <button
          type="button"
          className="bg-amber-400 hover:bg-amber-500 transition-colors text-[#0b1736] font-medium text-sm px-6 py-3 rounded-md shadow-sm self-start md:self-auto"
        >
          Contact us
        </button>
      </div>
    </section>
  )
}

export default ContactCTA