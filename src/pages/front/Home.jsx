import React from 'react'
import Header from '../../component/common/header'
import ModelHeroSection from '../../component/ModelHeroSection'
import OurServicesSection from '../../component/OurServicesSection'
import FeaturedModelsSection from '../../component/FeaturedModelsSection'
import ModelAboutSection from '../../component/ModelAboutSection'
import AboutAndReviewsSection from '../../component/AboutAndReviewsSection'
import HeroSection from '../../component/HeroSection'
import ServicesSection from '../../component/ServicesSection'
import MostSearchedLocations from '../../component/MostSearchedLocations'
import AboutEscortServices from '../../component/AboutEscortServices'
import FinalThoughtsFAQ from '../../component/FinalThoughtsFAQ'
import Footer from '../../component/common/Footer'

const Home = () => {
    return (
        <div>
            <Header />
              <HeroSection />
            {/* <ModelHeroSection /> */}
            {/* <OurServicesSection /> */}

            {/* add this  */}
            <FeaturedModelsSection />
            <ServicesSection />
            <ModelAboutSection />
            <MostSearchedLocations />
            <AboutAndReviewsSection />
          
            
            
            {/* <AboutEscortServices /> */}
            {/* <FinalThoughtsFAQ /> */}
            {/* <ModelHeroSection />  */}
            <Footer />

        </div>
    )
}

export default Home