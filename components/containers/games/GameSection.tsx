"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GameItemData from "@/public/data/game-items-data";
import one from "@/public/images/chart.png";
import two from "@/public/images/btc-two.png";
import three from "@/public/images/rocket.png";
import { handleSearch } from "@/actions/search-games";

const categoryIcons: Record<string, string> = {
	slot: "ti ti-gavel",
	casino: "ti ti-poker-chip",
	jackpot: "ti ti-dice-5",
	lottery: "ti ti-dice-5",
};

const GameSection = () => {
	const isotope = useRef<Isotope | null>(null);
	const [filterKey, setFilterKey] = useState("*");
	const [isotopeReady, setIsotopeReady] = useState(false);

	useEffect(() => {
		const initIsotope = async () => {
			const IsotopeModule = await import("isotope-layout");
			isotope.current = new IsotopeModule.default(".filter-wrapper", {
				itemSelector: ".filter-item",
				layoutMode: "fitRows",
				transitionDuration: "0.6s",
			});
			setIsotopeReady(true);
		};

		if (typeof window !== "undefined") {
			initIsotope();
		}

		return () => {
			if (isotope.current) {
				isotope.current.destroy();
				isotope.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!isotopeReady || !isotope.current) return;

		isotope.current.arrange({
			filter: (itemElem: Element) => {
				const matchesCategory =
					filterKey === "*" || itemElem.classList.contains(filterKey);

				if (!matchesCategory) return false;

				return true;
			},
		});
	}, [filterKey, isotopeReady]);

	const filters = [
		"*",
		...Array.from(new Set(GameItemData.flatMap((item) => item.categories))),
	];

	return (
		<section className="game pt-120 pb-120">
			<div className="container">
				<div className="row gutter-24">
					<div className="col-12 col-xl-8">
						<div className="result__tab-btns text-start">
							<ul>
								{filters.map((key, idx) => (
									<li key={idx}>
										<button
											className={filterKey === key ? "active" : ""}
											onClick={() => setFilterKey(key)}
										>
											{key === "*" ? (
												<>
													<i className="ti ti-layout-grid"></i> All Categories
												</>
											) : (
												<>
													<i className={categoryIcons[key]}></i>{" "}
													{key.charAt(0).toUpperCase() + key.slice(1)}
												</>
											)}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="col-12 col-xl-4">
						<div className="lottery-sidebar">
							<div className="lottery__result-form">
								<form action={handleSearch}>
									<div className="group-pst">
										<input
											type="text"
											name="search-term"
											placeholder="Search Here..."
											aria-label="Search games"
											required
										/>
										<button type="submit">
											<i className="fa-solid fa-magnifying-glass"></i>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div
					className="row gutter-24 mt-40 filter-wrapper"
					data-aos="fade-up"
					data-aos-duration="800"
				>
					{GameItemData.map((game) => (
						<div
							key={game.id}
							className={`col-12 col-lg-6 col-xl-4 filter-item ${game.categories
								.map((cat) => cat.toLowerCase())
								.join(" ")}`}
						>
							<div className="result__single tilt">
								<div className="contest__intro">
									{game.exclusive && <span>Exclusive</span>}
									<button aria-label="save" title="save">
										<i className="ti ti-heart"></i>
									</button>
								</div>
								<div className="thumb mt-20">
									<Link href="game-details">
										<Image src={game.image} alt={game.alt} />
									</Link>
								</div>
								<div className="content">
									<div className="contest-number">
										{game.featured && <p className="text-sm fw-6">Featured</p>}
									</div>
									<h5 className="fw-6 neutral-top">
										<Link href="game-details">{game.title}</Link>
									</h5>
									<ul className="platform mt-12">
										{game.platforms.map((platform, idx) => (
											<React.Fragment key={platform}>
												<li>{platform}</li>
												{idx < game.platforms.length - 1 && (
													<li>
														<span></span>
													</li>
												)}
											</React.Fragment>
										))}
									</ul>
									<div className="game__single-meta mt-25">
										<div className="rate-left">
											<div className="thumb-ic">
												<p className="text-lg fw-6">{game.rating}</p>
											</div>
											<div className="content-ic">
												<div className="review">
													<i className="fa-solid fa-star"></i>
													<i className="fa-solid fa-star"></i>
													<i className="fa-solid fa-star"></i>
													<i className="fa-solid fa-star"></i>
													<i className="fa-solid fa-star-half-stroke"></i>
												</div>
												<p className="text-xs mt-6">{game.ratingsCount}</p>
											</div>
										</div>
										<span className="divide d-none d-xxl-block"></span>
										<div className="rate-right">
											<div className="thumb-ic">
												<i className="fa-solid fa-share-nodes"></i>
											</div>
											<div className="content-ic">
												<p className="text-sm">Share & Earn</p>
												<p className="text-xs">Per share {game.sharePerEarn}</p>
											</div>
										</div>
									</div>
									<div className="cta mt-35">
										<Link
											href="game-details"
											aria-label="view details"
											title="view details"
											className="btn--primary"
										>
											View Details <i className="ti ti-arrow-narrow-right"></i>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="row">
					<div className="col-12">
						<div
							className="pagination-wrapper mt-40"
							data-aos="fade-up"
							data-aos-duration="600"
							data-aos-delay="100"
						>
							<ul className="pagination">
								<li>
									<button>
										<i className="ti ti-chevron-left"></i>
									</button>
								</li>
								<li>
									<Link href="games">1</Link>
								</li>
								<li>
									<Link href="games" className="active">
										2
									</Link>
								</li>
								<li>
									<Link href="games">3</Link>
								</li>
								<li>
									<button>
										<i className="ti ti-chevron-right"></i>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="chart">
				<Image src={one} alt="Image" />
			</div>
			<div className="btc">
				<Image src={two} alt="Image" />
			</div>
			<div className="rocket">
				<Image src={three} alt="Image" />
			</div>
		</section>
	);
};

export default GameSection;
