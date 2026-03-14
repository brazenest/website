import { sendVisitorMessage } from "@/functions/awsSesMailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name: visitorName, email: visitorEmail, message: visitorMessage } = body;

		if (!visitorName || !visitorEmail || !visitorMessage) {
			return NextResponse.json(
				{ error: "API /contact POST(): Missing required fields." },
				{ status: 400 }
			);
		}

		const adminEmail = "website.mailer@aldengillespy.com";
		const userEmail = "aldengillespy@icloud.com"

		const sendVisitorMessageResponse = await sendVisitorMessage({ adminEmail, userEmail, visitorName, visitorEmail, visitorMessage });
		// TODO: plug in your email sending service here
		console.log("API /contact POST(): 🔔 Contact Form Submission:", { visitorName, visitorEmail, visitorMessage });

		return NextResponse.json(sendVisitorMessageResponse, { status: 200 })
	} catch (err) {
		console.error('API /contact POST():', err);
		return NextResponse.json(
			{ error: "Server error. Try again later." },
			{ status: 500 }
		);
	}
}