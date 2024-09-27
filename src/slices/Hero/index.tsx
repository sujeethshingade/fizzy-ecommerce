"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextSplitter } from "./TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  useGSAP(() => {
    const introTl = gsap.timeline()
    introTl
      .set('.hero', {
        opacity: 1,
      })

      .from('.hero-header-word', {
        scale: 3,
        opacity: 0,
        ease: 'power4.in',
        delay: .3,
        stagger: 1,
      })
      .from('.hero-subheading', {
        opacity: 0,
        y: 30,
      },
        "+=.8",
      )
      .from('.hero-body', {
        opacity: 0,
        y: 10,
      })
      .from('.hero-button', {
        opacity: 0,
        y: 10,
        duration: .6,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    scrollTl
      .fromTo(
        "body", {
        backgroundColor: "#FDE047"
      }, {
        backgroundColor: "#D9F99D",
        overwrite: "auto"
      },
        1,
      )
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(3)",
        duration: .5
      })
      .from(".text-side-body", {
        opacity: 0,
        y: 20,
      })

  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header mt-12 text-7xl md:text-[9rem] lg:text-[13rem] font-black uppercase leading-[.8] text-orange-500">
              <TextSplitter text={asText(slice.primary.heading)} wordDisplayStyle="block" className="hero-header-word" />
            </h1>
            <div className="hero-subheading mt-12 text-5xl lg:text-6xl font-semibold text-sky-950">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} className="hero-button mt-12" />
          </div>
        </div>
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage className="md:hidden w-full" field={slice.primary.cans_image} />
          <div>
            <h2 className="text-side-heading text-6xl lg:text-8xl text-balance uppercase font-black text-sky-950">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <h2 className="tsxt-side-body mt-4 mx-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </h2>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
