"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import VanillaTilt from "vanilla-tilt";

gsap.registerPlugin(ScrollTrigger);

const CustomAnimations = () => {
	useEffect(() => {
		const tiltInstances: HTMLElement[] = [];

		const initAnimations = () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

			// Progress Bar Animation
			const progressBars = document.querySelectorAll<HTMLElement>(".pg-single");

			progressBars.forEach((element) => {
				const wrapper = element.querySelector<HTMLElement>(
					".progress-bar-wrapper"
				);
				const percentBar = element.querySelector<HTMLElement>(
					".progress-bar-percent"
				);
				const percentText =
					element.querySelector<HTMLElement>(".percent-value");

				if (!wrapper || !percentBar || !percentText) return;

				const percentAttr = wrapper.getAttribute("data-percent");
				if (!percentAttr) return;

				const percent = parseInt(percentAttr, 10);

				const tl = gsap.timeline({
					defaults: { duration: 2 },
					scrollTrigger: {
						trigger: element,
						start: "top 80%",
						end: "bottom 20%",
						toggleActions: "play none none none",
					},
				});

				tl.fromTo(percentBar, { width: "0%" }, { width: `${percent}%` });
				tl.from(
					percentText,
					{
						textContent: 0,
						snap: { textContent: 5 },
					},
					"<"
				);
			});

			// Title Animation
			const titleElements =
				document.querySelectorAll<HTMLElement>(".title-animation");

			titleElements.forEach((element) => {
				const split = new SplitType(element, {
					types: "chars,words",
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: element,
						start: "top 90%",
						end: "bottom 60%",
						toggleActions: "play none none none",
					},
				});

				tl.from(split.chars, {
					duration: 0.8,
					x: 40,
					autoAlpha: 0,
					stagger: 0.05,
					ease: "back.out",
				});
			});
		};

		// Initialize VanillaTilt
		const initTilt = () => {
			const tiltElements = document.querySelectorAll(
				".tilt"
			) as NodeListOf<HTMLElement>;
			tiltElements.forEach((el) => {
				VanillaTilt.init(el, {
					max: 5,
					speed: 3000,
				});
				tiltInstances.push(el);
			});
		};

		// Delay init slightly to ensure DOM readiness
		const timeoutId = setTimeout(() => {
			initAnimations();
			initTilt();
		}, 100);

		// Cleanup on unmount
		return () => {
			clearTimeout(timeoutId);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			tiltInstances.forEach((el) => {
				const tiltInstance = el as HTMLElement & {
					vanillaTilt?: { destroy: () => void };
				};
				tiltInstance.vanillaTilt?.destroy();
			});
		};
	}, []);

	return null;
};

export default CustomAnimations;
