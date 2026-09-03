import React, { useState } from 'react'
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { sendMessage } from "../../services/contactService"

const ACCENT = '#ff4d1a' 
const BUTTON_YELLOW = '#ffb800' // Warm bright yellow from your image

export function ContactSection() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) {
      toast.error("Please login first.")
      navigate("/login")
      return
    }

    try {
      await sendMessage(form)

      toast.success("Message sent successfully!")

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to send message"
      )
    }
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
      value: '123 Service Hub Road, Colombo 05, Sri Lanka',
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
            Contact us
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
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-neutral-100 rounded-md"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-sm text-neutral-400">
                    {label}
                  </p>
                  <p className="text-lg font-bold text-neutral-900">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - form */}
        <div className="bg-[#fffdf5] border border-[#fef3c7] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-10 rounded-2xl">
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
                className="w-full border-0 bg-white px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
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
                className="w-full border-0 bg-white px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
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
                className="w-full border-0 bg-white px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
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
                className="w-full resize-none border-0 bg-white px-5 py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95 rounded-md"
              style={{ backgroundColor: BUTTON_YELLOW }}
            >
              Send a message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}