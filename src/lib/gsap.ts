import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export * from 'gsap';
export * from 'gsap/dist/ScrollTrigger';
export { useGSAP };
export default gsap;
