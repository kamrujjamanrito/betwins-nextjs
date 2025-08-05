"use client";
import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
	const innerRef = useRef<HTMLDivElement>(null);
	const outerRef = useRef<HTMLDivElement>(null);
	const [hoverClass, setHoverClass] = useState<string | null>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const inner = innerRef.current;
		const outer = outerRef.current;
		if (!inner || !outer) return;

		let mouseX = 0;
		let mouseY = 0;
		let innerX = 0;
		let innerY = 0;
		const speed = 0.2;

		const onMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			outer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
		};

		const loop = () => {
			const dx = mouseX - innerX;
			const dy = mouseY - innerY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance > 1) {
				innerX += dx * speed;
				innerY += dy * speed;
				inner.style.transform = `translate(${innerX}px, ${innerY}px)`;
			}

			animationRef.current = requestAnimationFrame(loop);
		};

		window.addEventListener("mousemove", onMouseMove);
		animationRef.current = requestAnimationFrame(loop);

		inner.style.visibility = "visible";
		outer.style.visibility = "visible";

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			window.removeEventListener("mousemove", onMouseMove);

			inner.style.visibility = "hidden";
			outer.style.visibility = "hidden";
			inner.removeAttribute("style");
			outer.removeAttribute("style");
		};
	}, []);

	useEffect(() => {
		const inner = innerRef.current;
		const outer = outerRef.current;
		if (!inner || !outer) return;

		const dynamicClasses = [
			"cursor-hover",
			"cursor-big",
			"drag-cursor",
			"view-cursor",
			"not-cursor-outer",
		];

		dynamicClasses.forEach((cls) => {
			inner.classList.remove(cls);
			outer.classList.remove(cls);
		});

		if (hoverClass) {
			inner.classList.add(hoverClass);
			outer.classList.add(hoverClass);
		}
	}, [hoverClass]);

	useEffect(() => {
		const handlePointerOver = (e: PointerEvent) => {
			const target = e.target as HTMLElement;
			if (!target) return;

			if (
				target.closest(
					"a:not(.not-cursor), button:not(.not-cursor), .cursor-pointer"
				)
			) {
				setHoverClass("cursor-hover");
			} else if (target.closest("h1, h2, h3, h4, h5, h6, .cursor-lg")) {
				setHoverClass("cursor-big");
			} else if (target.closest(".draggable-cursor")) {
				setHoverClass("drag-cursor");
			} else if (target.closest(".viewable-cursor")) {
				setHoverClass("view-cursor");
			} else if (target.closest(".not-cursor")) {
				setHoverClass("not-cursor-outer");
			} else {
				setHoverClass(null);
			}
		};

		window.addEventListener("pointermove", handlePointerOver);
		return () => {
			window.removeEventListener("pointermove", handlePointerOver);
		};
	}, []);

	return (
		<>
			<div ref={outerRef} className="mouseCursor cursor-outer" />
			<div ref={innerRef} className="mouseCursor cursor-inner" />
		</>
	);
};

export default CustomCursor;
