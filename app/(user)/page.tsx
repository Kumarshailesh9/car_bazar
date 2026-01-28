"use client"

import AboutUs from "./about/page"
import CarsPage from "./cars/page"
import WhyChooseUs from "./components/ChooseUs"
import Gallery from "./components/Gallary"
import HowItWorks from "./components/HowItsWork"
import ShowroomGallery from "./components/showroom"
import WatchCarsSection from "./components/WatchCarsSection"
import ContactUs from "./contact/page"

  export default function Profile(){
    return (
      <>
     <Gallery/>
     {/* <ShowroomGallery/> */}
     <CarsPage/>
     <WatchCarsSection/>
     <WhyChooseUs/>
     <HowItWorks/>
      <AboutUs/>
      <ContactUs/>
      </>
    )
  }