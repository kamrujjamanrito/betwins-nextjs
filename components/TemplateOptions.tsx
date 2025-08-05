"use client";
import { useEffect, useState } from "react";

const TemplateOptions = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [cursorType, setCursorType] = useState<"animated" | "default">(
		"animated"
	);
	const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

	useEffect(() => {
		const wrapper = document.querySelector(".page-wrapper");
		if (!wrapper) return;

		if (cursorType === "animated") {
			wrapper.classList.add("a-cursor");
		} else {
			wrapper.classList.remove("a-cursor");
		}

		if (direction === "rtl") {
			wrapper.classList.add("rtl");
		} else {
			wrapper.classList.remove("rtl");
		}

		return () => {
			wrapper.classList.remove("a-cursor");
			wrapper.classList.remove("rtl");
		};
	}, [cursorType, direction]);

	const togglePanel = () => setIsOpen((prev) => !prev);

	const cursorOptions: Array<{
		label: string;
		value: "animated" | "default";
		className: string;
	}> = [
		{ label: "Animated", value: "animated", className: "animated-cursor" },
		{ label: "Default", value: "default", className: "default-cursor" },
	];

	const directionOptions: Array<{
		label: string;
		value: "ltr" | "rtl";
		className: string;
	}> = [
		{ label: "LTR", value: "ltr", className: "ltr-yes" },
		{ label: "RTL", value: "rtl", className: "ltr-no" },
	];

	return (
		<div className="color-palate">
			<div className="color-icon" style={{ right: isOpen ? "280px" : "0px" }}>
				<button
					className={isOpen ? "close-color" : "open-color"}
					onClick={togglePanel}
					aria-label={isOpen ? "Close panel" : "Open panel"}
				>
					<i className={`ti ${isOpen ? "ti-x" : "ti-settings-filled"}`}></i>
				</button>
			</div>

			<div
				className="color-palate-inner"
				style={{
					right: isOpen ? "0px" : "-280px",
					transition: "right 0.3s ease",
				}}
			>
				<div className="group">
					<h6 className="not-cursor">Cursor</h6>
					<ul className="cursor-version">
						{cursorOptions.map(({ label, value, className }) => (
							<li
								key={value}
								className={`cursor-pointer ${className} ${
									cursorType === value ? "active" : ""
								}`}
								onClick={() => setCursorType(value)}
							>
								{label}
							</li>
						))}
					</ul>
				</div>

				<div className="group">
					<h6 className="not-cursor">Direction</h6>
					<ul className="rtl-version">
						{directionOptions.map(({ label, value, className }) => (
							<li
								key={value}
								className={`cursor-pointer ${className} ${
									direction === value ? "active" : ""
								}`}
								onClick={() => setDirection(value)}
							>
								{label}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TemplateOptions;
