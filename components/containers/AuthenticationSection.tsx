"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import circle from "@/public/images/authentication/circle.png";
import thumb from "@/public/images/authentication/thumb.png";
import numbers from "@/public/images/authentication/numbers.png";
import { loginUser } from "@/actions/auth";

const AuthenticationSection = () => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<section className="authentication pt-120 pb-120">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-12 col-lg-6 col-xl-6">
						<div
							className="authentication__inner"
							data-aos="fade-right"
							data-aos-duration="600"
						>
							<div className="authentication__intro">
								<Link
									href="/"
									aria-label="back to home"
									title="back to home"
									className="btn--primary"
								>
									<i className="ti ti-arrow-narrow-left"></i>Back To Home
								</Link>
							</div>
							<div className="authentication__content mt-80">
								<h4 className="title-animation neutral-top fw-6 mb-10">
									Let&apos;s Get Started!
								</h4>
								<p>Sign in to your account and join us</p>
							</div>
							<div className="authentication__form mt-55">
								<form action={loginUser}>
									<div className="input-wrapper mt-30">
										<label htmlFor="authEmail">Your Email</label>
										<div className="input-single">
											<input
												type="email"
												name="auth-email"
												id="authEmail"
												placeholder="Enter Email"
												required
											/>
											<i className="fa-solid fa-envelope"></i>
										</div>
									</div>

									<div className="input-wrapper mt-30 password-group">
										<label htmlFor="authPassword">Your Password</label>
										<div className="input-single">
											<input
												type={showPassword ? "text" : "password"}
												name="auth-password"
												id="authPassword"
												placeholder="Enter password"
												required
											/>
											<i
												className={`ti ${
													showPassword ? "ti-eye" : "ti-eye-off"
												} show-pass`}
												onClick={togglePasswordVisibility}
												style={{ cursor: "pointer" }}
												aria-label="Toggle password visibility"
											></i>
										</div>
									</div>

									<p className="text-end mt-16 forget-pass">
										<Link href="contact-us">Forget Password?</Link>
									</p>
									<p className="create-msg mt-20">
										Don&apos;t have an account?{" "}
										<Link href="sign-up">Sign Up</Link>
									</p>

									<div className="mt-40">
										<button
											type="submit"
											aria-label="submit message"
											title="submit message"
											className="btn--primary"
										>
											Sign In<i className="ti ti-arrow-narrow-right"></i>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
						<div
							className="authentication__thumb text-center d-none d-lg-block"
							style={{
								backgroundImage: "url(images/authentication/thumb-sm.png)",
							}}
						>
							<div className="circle-img">
								<Image src={circle} alt="Image" />
							</div>
							<div className="thumb">
								<Image
									src={thumb}
									alt="Image"
									data-aos="zoom-in"
									data-aos-duration="600"
								/>
							</div>
							<div className="number-img">
								<Image src={numbers} alt="Image" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AuthenticationSection;
