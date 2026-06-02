import React from 'react'
 import HeroGrid from '../components/HeroGrid'
import ServicesSection from '../components/ServicesSection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div>
      <HeroGrid/>
      <ServicesSection/>
      <FAQSection/>
      <Footer/>
        
    </div>
  )
}

export default HomePage