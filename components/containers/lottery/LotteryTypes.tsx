"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LotteryData from "@/public/data/lottery-data";
import leftThumb from "@/public/images/left-th.png";
import chart from "@/public/images/chart.png";

type LotteryCountdownTimeLeft = {
	[key: number]: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	} | null;
};

const LotteryTypes = () => {
	const [lotteryCountdownTimeLeft, setLotteryCountdownTimeLeft] =
		useState<LotteryCountdownTimeLeft>({});

	const getLotteryCountdownTimeLeft = (targetDate: string) => {
		const diff = new Date(targetDate).getTime() - new Date().getTime();
		if (diff <= 0) return null;
		return {
			days: Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((diff / (1000 * 60)) % 60),
			seconds: Math.floor((diff / 1000) % 60),
		};
	};

	useEffect(() => {
		const lotteryCountdownInterval = setInterval(() => {
			const updatedCountdown: LotteryCountdownTimeLeft = {};
			LotteryData.forEach((lottery) => {
				updatedCountdown[lottery.id] = getLotteryCountdownTimeLeft(
					lottery.drawTime
				);
			});
			setLotteryCountdownTimeLeft(updatedCountdown);
		}, 1000);

		return () => clearInterval(lotteryCountdownInterval);
	}, []);

	return (
		<section
			className="lt-type pt-120 pb-120"
			style={{ backgroundImage: "url(images/lottery-details.png)" }}
		>
			<div className="container">
				<div
					className="row gutter-20 align-items-center mb-55 rtl-header"
					data-aos="fade-up"
					data-aos-duration="600"
				>
					<div className="col-12 col-lg-7 col-xl-8 col-xxl-6">
						<div className="section__content">
							<span className="fw-6 secondary-text text-xl">
								<strong>Top,</strong> Lottery Picks
							</span>
							<h2 className="title-animation fw-6 mt-25">
								Trending Lotteries with Big Payout
							</h2>
						</div>
					</div>
					<div className="col-12 col-lg-5 col-xl-4 col-xxl-4 offset-xxl-2">
						<div className="section__content-right">
							<p>
								Experience the excitement of playing the most popular lotteries
								worldwide, all in one place.
							</p>
							<div className="mt-25">
								<Link href="lottery" className="btn--secondary">
									Explore All <i className="ti ti-arrow-narrow-right"></i>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="row gutter-24">
					{LotteryData.map((item) => {
						const countdown = lotteryCountdownTimeLeft[item.id];
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
										<Link href="lottery-details" className="btn--primary">
											Play Now <i className="ti ti-arrow-narrow-right"></i>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="left-thumb-th">
				<Image src={leftThumb} alt="Image" />
			</div>
			<div className="chart">
				<Image src={chart} alt="Image" />
			</div>
		</section>
	);
};

export default LotteryTypes;
