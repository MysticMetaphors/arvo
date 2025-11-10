"use client"

import { motion } from "framer-motion"
import Carousel from "../ui/Carousel"
const users = [
  {
    name: "Alice M.",
    feedback: "Arvo transformed our online presence. Their innovative solutions and dedicated team elevated our brand to new heights.",
    image: "/default.png",
  },
  {
    name: "Alice M.",
    feedback: "Arvo transformed our online presence. Their innovative solutions and dedicated team elevated our brand to new heights.",
    image: "/default.png",
  },
  {
    name: "Alice M.",
    feedback: "Arvo transformed our online presence. Their innovative solutions and dedicated team elevated our brand to new heights.",
    image: "/default.png",
  },
  {
    name: "Alice M.",
    feedback: "Arvo transformed our online presence. Their innovative solutions and dedicated team elevated our brand to new heights.",
    image: "/default.png",
  },
  {
    name: "Alice M.",
    feedback: "Arvo transformed our online presence. Their innovative solutions and dedicated team elevated our brand to new heights.",
    image: "/default.png",
  }
]

export default function Testimonials() {
  
  return (
    <section id="pricing" className="bg-black-primary">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:pt-12 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">Hear It Straight From <span className="text-green-primary">Them</span></h2>
          <p className="mb-5 text-gray-400 sm:text-md">Real stories from people who've trusted us to bring their ideas to life. Their success is what keeps us going.</p>
        </div>
      </div>
      <div className="mb-20">
        <Carousel items={users}/>
        <Carousel items={users} reverse={true}/>
      </div>
    </section>
  )
}