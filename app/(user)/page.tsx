"use client"

import AboutUs from "./about/page"
import CarsPage from "./cars/page"
import PopularBrands from "./components/Brands"
import WhyChooseUs from "./components/ChooseUs"
import Gallery from "./components/Gallary"
import HowItWorks from "./components/HowItsWork"
import FounderCard from "./components/Owener"
import WatchCarsSection from "./components/WatchCarsSection"
import ContactUs from "./contact/page"

  export default function Profile(){
    return (
      <>
     <Gallery/>
     {/* <ShowroomGallery/> */}
     <CarsPage/>
     <WatchCarsSection/>
     <FounderCard/>
      <PopularBrands/>
     <WhyChooseUs/>
     <HowItWorks/>
      <AboutUs/>
      <ContactUs/>
      </>
    )
  }