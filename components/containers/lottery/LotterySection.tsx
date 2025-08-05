"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LotteryData from "@/public/data/lottery-data";
import leftThumb from "@/public/images/left-th.png";
import chart from "@/public/images/chart.png";
import NiceSelectWrapper from "@/components/NiceSelectWrapper";

type TimeLeft = {
	[key: number]: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	} | null;
};

const LotterySection = () => {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

	const calculateTimeLeft = (targetDate: string) => {
		const difference = new Date(targetDate).getTime() - new Date().getTime();

		if (difference <= 0) return null;

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / (1000 * 60)) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	};

	useEffect(() => {
		const timer = setInterval(() => {
			const updated: TimeLeft = {};
			LotteryData.forEach((item) => {
				updated[item.id] = calculateTimeLeft(item.drawTime);
			});
			setTimeLeft(updated);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<NiceSelectWrapper />
			<section className="lt-type pt-120 pb-120">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="lt-type__filter mb-40">
								<div className="filter-group">
									<select
										name="country"
										className="country-select select"
										defaultValue=""
									>
										<option value="" disabled hidden>
											Start Date
										</option>
										<option value="jan">22/02/25</option>
										<option value="feb">19/03/25</option>
										<option value="mar">05/12/25</option>
									</select>

									<select
										name="country"
										className="country-select select"
										defaultValue=""
									>
										<option value="" disabled hidden>
											End Date
										</option>
										<option value="jan">22/02/25</option>
										<option value="feb">19/03/25</option>
										<option value="mar">05/12/25</option>
									</select>
									<select
										name="categories"
										className="categories-select select"
										defaultValue=""
									>
										<option value="" disabled hidden>
											Categories
										</option>
										<option value="car">Car</option>
										<option value="bike">Bike</option>
										<option value="laptop">Laptop</option>
										<option value="watch">Watch</option>
									</select>
									<select
										name="currency"
										className="currency-select select"
										defaultValue=""
									>
										<option value="" disabled hidden>
											Currency
										</option>
										<option value="btc">BTC</option>
										<option value="eth">ETH</option>
										<option value="doge">DOGE</option>
									</select>
									<select
										name="country"
										className="country-select select"
										defaultValue=""
									>
										<option value="" disabled hidden>
											Country
										</option>
										<option value="french">France</option>
										<option value="italian">Italy</option>
										<option value="canada">Canada</option>
									</select>
								</div>
								<div className="cta">
									<button
										className="btn--primary"
										aria-label="search here"
										title="search here"
									>
										Search Here
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="row gutter-24">
						{LotteryData.map((item) => {
							const countdown = timeLeft[item.id];

							return (
								<div
									className="col-12 col-md-6 col-xl-4 col-xxl-3"
									data-aos="fade-up"
									data-aos-duration="600"
									data-aos-delay={item.delay}
									key={item.id}
								>
									<div className="lt-type__single text-center tilt">
										<span className="serial">#{item.id}</span>
										<span className="price">{item.price}</span>
										<div className="thumb">
											<Image src={item.image} alt={item.alt} />
										</div>
										<div className="content mt-20">
											<h6 className="fw-6">
												<Link href="lottery-details">{item.title}</Link>
											</h6>
											<div className="timer mt-20">
												<p>
													<i className="ti ti-clock-hour-3"></i> Next Draw:{" "}
													<span className="draw-timer">
														{countdown ? (
															<>
																{countdown.days}d {countdown.hours}h{" "}
																{countdown.minutes}m {countdown.seconds}s
															</>
														) : (
															<>EXPIRED</>
														)}
													</span>
												</p>
											</div>
										</div>
										<div className="cta mt-25">
											<Link
												href="lottery-details"
												aria-label="view details"
												title="view details"
												className="btn--primary"
											>
												Play Now <i className="ti ti-arrow-narrow-right"></i>
											</Link>
										</div>
									</div>
								</div>
							);
						})}
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
										<Link href="lottery">1</Link>
									</li>
									<li>
										<Link href="lottery" className="active">
											2
										</Link>
									</li>
									<li>
										<Link href="lottery">3</Link>
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

				<div className="left-thumb-th">
					<Image src={leftThumb} alt="Image" />
				</div>
				<div className="chart">
					<Image src={chart} alt="Image" />
				</div>
			</section>
		</>
	);
};

export default LotterySection;
