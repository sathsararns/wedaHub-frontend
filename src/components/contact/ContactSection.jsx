
import React, { useState } from 'react'
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react'

const ACCENT = '#bf8d5b'

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // submit logic here
  }

  const contactItems = [
    {
      icon: PhoneIcon,
      label: 'Have any question?',
      value: 'Free +92 (8800) - 8960',
    },
    {
      icon: MailIcon,
      label: 'Write email',
      value: 'needhelp@company.com',
    },
    {
      icon: MapPinIcon,
      label: 'Visit now',
      value: '80 broklyn golden street, New York',
    },
  ]

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <div>
          <p
            className="mb-5 text-sm font-bold uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            // Contact us
          </p>
          <h2 className="max-w-md text-4xl font-extrabold leading-tight text-neutral-900 sm:text-5xl">
            Get in touch with our expert agents
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-500">
            Our success is determined not only by the results we acquire, but
            also by the manner in which we achieve them on way to see that.
          </p>

          <ul className="mt-10 space-y-7">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-5">
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-neutral-100"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-sm text-neutral-400">{label}</p>
                  <p className="text-lg font-bold text-neutral-900">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - form */}
        <div className="border border-neutral-100 p-6 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border-0 bg-neutral-100 px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-neutral-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full border-0 bg-neutral-100 px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-neutral-300"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border-0 bg-neutral-100 px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-neutral-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Write a message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write a message"
                className="w-full resize-none border-0 bg-neutral-100 px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-neutral-300"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-95"
              style={{ backgroundColor: ACCENT }}
            >
              Send a message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
