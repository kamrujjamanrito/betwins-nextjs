"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarData from "@/public/data/navbar-data";
import TopGames from "./TopGames";
import LanguageSelector from "@/components/layout/header/LanguageSelector";
import SearchPopup from "./SearchPopup";
import OffCanvasMenu from "./OffCanvasMenu";
import logo from "@/public/images/logo.png";

interface HeaderProps {
	showTopGames?: boolean;
}

const Header = ({ showTopGames = true }: HeaderProps) => {
	const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const openOffcanvas = () => setIsOffcanvasOpen(true);
	const closeOffcanvas = () => setIsOffcanvasOpen(false);

	const openSearch = () => setIsSearchOpen(true);
	const closeSearch = () => setIsSearchOpen(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 45);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isSearchOpen) {
			document.body.classList.add("search-active");
		} else {
			document.body.classList.remove("search-active");
		}

		return () => {
			document.body.classList.remove("search-active");
		};
	}, [isSearchOpen]);

	return (
		<>
			<header className={`header ${scrolled ? "sticky-header" : ""}`}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="main-header__menu-box">
								<nav className="navbar p-0">
									<div className="navbar__intro">
										<div className="navbar-logo">
											<Link href="/">
												<Image src={logo} alt="Image" />
											</Link>
										</div>
										{showTopGames && <TopGames />}
									</div>
									<div className="navbar__menu d-none d-xl-block">
										<ul className="navbar__list">
											{NavbarData.map((item, index) => {
												if (item.submenu) {
													return (
														<li
															className="navbar__item navbar__item--has-children nav-fade"
															key={index}
														>
															<a
																aria-label="dropdown menu"
																className="navbar__dropdown-label dropdown-label-alter"
															>
																{item.title}
															</a>
															<ul className="navbar__sub-menu">
																{item.submenu.map((sub, i) => {
																	return (
																		<li key={i}>
																			<Link href={sub.path}>{sub.title}</Link>
																		</li>
																	);
																})}
															</ul>
														</li>
													);
												} else {
													return (
														<li className="navbar__item nav-fade" key={index}>
															<Link href={item.path}>{item.title}</Link>
														</li>
													);
												}
											})}
										</ul>
									</div>
									<div className="navbar__options">
										<div className="navbar__mobile-options">
											<div className="navbar__mobile-icons">
												<div className="search-box">
													<button
														className="open-search"
														aria-label="search products"
														title="open search box"
														onClick={openSearch}
													>
														<i className="ti ti-search"></i>
													</button>
												</div>
												<LanguageSelector />
											</div>
											<div className="navbar__cta d-none d-sm-flex">
												<Link
													href="sign-in"
													aria-label="sign in"
													title="sign in"
													className="btn--secondary"
												>
													Sign In <i className="ti ti-arrow-narrow-right"></i>
												</Link>
												<Link
													href="sign-up"
													aria-label="create account"
													title="create account"
													className="btn--primary"
												>
													Sign Up <i className="ti ti-arrow-narrow-right"></i>
												</Link>
											</div>
										</div>
										<button
											className={`open-offcanvas-nav d-flex d-xl-none ${
												isOffcanvasOpen ? " open-offcanvas-nav-active" : " "
											}`}
											aria-label="toggle mobile menu"
											title="open offcanvas menu"
											onClick={openOffcanvas}
										>
											<span className="icon-bar top-bar"></span>
											<span className="icon-bar middle-bar"></span>
											<span className="icon-bar bottom-bar"></span>
										</button>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>

			<SearchPopup onClose={closeSearch} />
			<OffCanvasMenu isOpen={isOffcanvasOpen} onClose={closeOffcanvas} />
		</>
	);
};

export default Header;
