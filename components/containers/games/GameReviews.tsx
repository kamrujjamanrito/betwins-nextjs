"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GameReviewsData from "@/public/data/reveiw-data";
import { submitReply } from "@/actions/review-form";

const GameReviews = () => {
	const { averageRating, reviews, replyAvatar } = GameReviewsData;
	const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

	const toggleReply = (id: number) => {
		setActiveReplyId((prev) => (prev === id ? null : id));
	};

	return (
		<>
			<div className="blog__details-card-sm mt-60">
				<div className="card__intro">
					<h6 className="title-animation neutral-top fw-6">Average Reviews</h6>
				</div>
				<hr className="divider mt-30 mb-40" />
				<div
					className="review-wrapper"
					data-aos="fade-up"
					data-aos-duration="600"
				>
					<div className="review-left text-center">
						<h3 className="fw-6">
							{averageRating.score}
							<span className="text-xxl">/5</span>
						</h3>
						<div className="review mt-8">
							{[...Array(Math.floor(averageRating.score))].map((_, i) => (
								<i key={i} className="fa-solid fa-star"></i>
							))}
							{averageRating.score % 1 !== 0 && (
								<i className="fa-solid fa-star-half-stroke"></i>
							)}
						</div>
						<p className="mt-12 fw-5">{averageRating.totalRatings} Rating</p>
					</div>
					<div className="review-right">
						<div className="pg-wrapper">
							{averageRating.stars.map((star, idx) => (
								<div className="pg-single" key={star}>
									<p className="pg-left">
										<i className="fa-solid fa-star"></i>
										{star}
									</p>
									<div
										className="progress-bar-wrapper"
										data-percent={`${averageRating.distribution[idx]}%`}
									>
										<div className="progress-bar">
											<div
												className="progress-bar-percent"
												style={{ width: `${averageRating.distribution[idx]}%` }}
											></div>
										</div>
									</div>
									<span className="percent-value">
										{averageRating.distribution[idx]}%
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<hr className="divider mt-40 mb-40" />

				<div
					className="card__intro crc mb-40"
					data-aos="fade-up"
					data-aos-duration="600"
				>
					<h6 className="title-animation neutral-top fw-6">All Reviews</h6>
					<div className="sort-wrapper">
						<p>Sort By:</p>
						<select name="sort" className="sort-select select" defaultValue="">
							<option value="" disabled hidden>
								Date
							</option>
							<option value="new">New</option>
							<option value="old">Old</option>
						</select>
					</div>
				</div>

				{reviews.map((review) => (
					<div
						className="comment__single mt-30"
						key={review.id}
						data-aos="fade-up"
						data-aos-duration="600"
					>
						<div className="comment__meta">
							<div className="author__info">
								<div className="thumb">
									<Image src={review.avatar} alt={review.alt} />
								</div>
								<div className="content">
									<p className="text-xl fw-6">{review.name}</p>
									<p>{review.role}</p>
								</div>
							</div>
							<div className="time">
								<p>{review.time}</p>
								<p>{review.date}</p>
							</div>
						</div>
						<hr className="divider mt-25 mb-30" />
						<div className="comment__single-content">
							<div className="review mb-20">
								{[...Array(review.stars)].map((_, i) => (
									<i key={i} className="fa-solid fa-star"></i>
								))}
							</div>
							<p>{review.content}</p>
							<hr className="divider mt-25 mb-25" />
							<div className="comment__single-action">
								<button title="like" className="single">
									<i className="ti ti-thumb-up"></i> 190
								</button>
								<div className="reply-button">
									<button
										aria-label="reply"
										onClick={() => toggleReply(review.id)}
										className={activeReplyId === review.id ? "active" : ""}
									>
										<i className="ti ti-messages"></i>Reply
									</button>
								</div>
							</div>
							{activeReplyId === review.id && (
								<div className="reply__comment mt-30">
									<div className="reply__comment-inner">
										<div className="thumb">
											<Image src={replyAvatar} alt="Reply Avatar" />
										</div>
										<form action={submitReply}>
											<input type="hidden" name="review-id" value={review.id} />

											<div className="input-group">
												<div className="input-single">
													<textarea
														name="reply-message"
														placeholder="Join the discussion..."
														required
													></textarea>
												</div>
												<div className="btn-wrapper">
													<button type="submit" className="btn--primary">
														Reply
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							)}
						</div>
					</div>
				))}

				<div className="mt-40">
					<Link href="/game-details" className="btn--secondary">
						See All Reviews
					</Link>
				</div>
			</div>
		</>
	);
};

export default GameReviews;
