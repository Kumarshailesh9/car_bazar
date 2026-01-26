"use client"

import AboutUs from "./about/page"
import WhyChooseUs from "./components/ChooseUs"
import Footer from "./components/Footer"
import Gallery from "./components/Gallary"
import HowItWorks from "./components/HowItsWork"
import Navbar from "./components/Navbar"
import ShowroomGallery from "./components/showroom"

  export default function Profile(){
    return (
      <>
     <Gallery/>
      <AboutUs/>
     <ShowroomGallery/>
     <WhyChooseUs/>
     <HowItWorks/>
      </>
    )
  }