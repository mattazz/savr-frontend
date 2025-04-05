import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "../config/constants";
import { useUser } from "../utils/hooks";

export default function AccountVerificationPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		const username = searchParams.get("username");
		const token = searchParams.get("token");
		if (!username || !token) {
			console.log("Missing parameters");
			return;
		}

		const email = `${username}@gmail.com`;
		const verifyAccount = async () => {
			try {
				if (user?.isVerified) {
					navigate("/");
				}
				// Send the PUT request with the data
				const response = await axios.put(`${backendUrl}api/user/verify/ep`, {
					email,
					token,
				});
				if (response.data.success || response.data.isVerified === true) {
				} else {
					console.log("Verification failed");
				}
			} catch (e) {
				console.error("Verification failed", e);
			} finally {
				navigate("/", { replace: true });
			}
		};

		verifyAccount();
	}, [searchParams, navigate, user?.isVerified]);
	return <></>;
}
