"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
	ssr: false,
});
const ScrollProgress = dynamic(() => import("./ScrollProgress"), {
	ssr: false,
});
const TemplateOptions = dynamic(() => import("./TemplateOptions"), {
	ssr: false,
});
const CustomAnimations = dynamic(() => import("./CustomAnimations"), {
	ssr: false,
});
const InitAnimations = dynamic(() => import("./InitAnimations"), {
	ssr: false,
});

const ClientWrapper = () => {
	return (
		<>
			<CustomCursor />
			<ScrollProgress />
			<TemplateOptions />
			<CustomAnimations />
			<InitAnimations />
		</>
	);
};

export default ClientWrapper;
