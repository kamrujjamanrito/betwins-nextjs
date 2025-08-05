"use client";
interface GlobalErrorProps {
	error: Error;
	reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html>
			<body>
				<div
					style={{
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
						backgroundColor: "#f8d7da",
						color: "#721c24",
						fontFamily: "Arial, sans-serif",
						padding: "20px",
					}}
				>
					<div>
						<h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
							Application Error
						</h1>
						<p style={{ marginBottom: "1.5rem" }}>{error.message}</p>
						<button
							onClick={() => reset()}
							style={{
								backgroundColor: "#721c24",
								padding: "12px 24px",
								borderRadius: "6px",
								color: "#fff",
								cursor: "pointer",
								border: "none",
								fontSize: "1rem",
							}}
						>
							Reload Application
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
