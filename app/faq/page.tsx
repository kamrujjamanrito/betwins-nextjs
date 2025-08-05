import type { Metadata } from "next";
import Header from "@/components/layout/header/Header";
import Breadcrumb from "@/components/layout/banner/Breadcrumb";
import FaqSection from "@/components/containers/FaqSection";
import ReferSection from "@/components/containers/ReferSection";
import WorkTwoSection from "@/components/containers/WorkTwoSection";
import Sponsors from "@/components/containers/Sponsors";
import Testimonial from "@/components/containers/testimonial/Testimonial";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import ClientWrapper from "@/components/ClientWrapper";

export const generateMetadata = async (): Promise<Metadata> => ({
	title: "FAQ | Betwins - Online Crypto Gaming",
	description:
		"Welcome to Betwins - the ultimate crypto gaming & lottery experience.",
	keywords: ["crypto gaming", "lottery", "betwins", "casino", "blockchain"],
	openGraph: {
		title: "Betwins - Crypto Gaming & Lottery",
		description: "Experience seamless blockchain - based gaming and lotteries.",
		url: "https://betwins.netlify.app/",
		siteName: "Betwins",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "Betwins Crypto Gaming",
			},
		],
		type: "website",
	},
	twitter: { card: "summary_large_image" },
});

const page = () => {
	return (
		<div className="page-wrapper a-cursor fcq">
			<Header />
			<Breadcrumb title="FAQ" />
			<FaqSection />
			<ReferSection />
			<WorkTwoSection />
			<Sponsors />
			<Testimonial />
			<FooterTwo />
			<ClientWrapper />
		</div>
	);
};

export default page;
