import React, { useState } from 'react'
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { motion, useReducedMotion } from 'framer-motion'
import { sendMessage } from "../../services/contactService"

const ACCENT = '#ff4d1a'
const BUTTON_YELLOW = '#ffb800' // Warm bright yellow from your image

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const riseItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const listItem = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function ContactSection() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

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

  const fieldFocus = shouldReduceMotion ? undefined : { scale: 1.01 }

  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <motion.div
          className="text-center lg:text-left"
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={riseItem}
            className="mb-4 sm:mb-5 text-sm font-bold uppercase tracking-widest"
            style={{ color: ACCENT }}
          >
            
          </motion.p>

          <motion.h2
                        variants={riseItem}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1736] mb-6 leading-tight"
                      >
                        Get in touch with our <br className="hidden sm:block" /> Range of{" "}
                        <span className="text-amber-500">Agents</span>
                      </motion.h2>


          {/* <motion.h2
            variants={riseItem}
            className="max-w-md mx-auto lg:mx-0 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-neutral-900"
          >
            Get in touch with our expert agents
          </motion.h2> */}
          <motion.p
            variants={riseItem}
            className="mt-5 sm:mt-6 max-w-md mx-auto lg:mx-0 text-base leading-relaxed text-neutral-500"
          >
            Our success is determined not only by the results we acquire, but
            also by the manner in which we achieve them on way to see that.
          </motion.p>

          <motion.ul
            className="mt-9 sm:mt-10 space-y-6 sm:space-y-7 text-left max-w-sm mx-auto lg:mx-0"
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactItems.map(({ icon: Icon, label, value }) => (
              <motion.li key={label} variants={listItem} className="flex items-center gap-4 sm:gap-5">
                <span
                  className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center bg-neutral-100 rounded-md"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-sm text-neutral-400">{label}</p>
                  <p className="text-base sm:text-lg font-bold text-neutral-900">{value}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right column - form */}
        <motion.div
          className="bg-[#fffdf5] border border-[#fef3c7] p-5 sm:p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-2xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <motion.input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                whileFocus={fieldFocus}
                transition={{ duration: 0.15 }}
                className="w-full border-0 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <motion.input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                whileFocus={fieldFocus}
                transition={{ duration: 0.15 }}
                className="w-full border-0 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <motion.input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                whileFocus={fieldFocus}
                transition={{ duration: 0.15 }}
                className="w-full border-0 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Write a message
              </label>
              <motion.textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write a message"
                whileFocus={fieldFocus}
                transition={{ duration: 0.15 }}
                className="w-full resize-none border-0 bg-white px-4 sm:px-5 py-3.5 sm:py-4 text-neutral-900 placeholder-neutral-400 outline-none transition focus:ring-2 focus:ring-yellow-200 rounded-lg shadow-sm"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-95 rounded-md"
              style={{ backgroundColor: BUTTON_YELLOW }}
            >
              Send a message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}