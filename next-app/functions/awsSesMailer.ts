import * as nodemailer from "nodemailer";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

const credentialProvider = fromNodeProviderChain({
	// This provider accepts any input of fromEnv(), fromSSO(), fromTokenFile(),
	// fromIni(), fromProcess(), fromInstanceMetadata(), fromContainerMetadata()
	// that exist in the default credential chain.

	// Optional client overrides. This is passed to an inner credentials client
	// that may be STS, SSO, or other instantiated to resolve the credentials.
	// Region and profile are inherited from the upper client if present
	// unless overridden, so it should not be necessary to set those.
	//
	// Warning: setting a region here may override the region set in
	// the config file for the selected profile if profile-based
	// credentials are used.
	clientConfig: {},
});

// 1. Configure the AWS SDK client (uses default credential chain if omitted)
const sesClient = new SESv2Client({
	credentials: credentialProvider,
});

// 2. Create a Nodemailer transport that points at SES
const transporter = nodemailer.createTransport({
	SES: { sesClient, SendEmailCommand },
});

// 3. Send the message
export const sendVisitorMessage = async ({ adminEmail, userEmail, visitorName, visitorEmail, visitorMessage }: sendVisitorMessageProps) => {
	try {
		const response = await transporter.sendMail({
			from: adminEmail,
			to: userEmail,
			subject: "New message from website visitor",
			html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body><div style="padding:20px;"><div style="max-width: 500px;"><h2>New message</h2><p>You have a new message from ${visitorName} (${visitorEmail}):</p><p>${visitorMessage}</p></div></div></body></html>`,
			ses: {
				ConfigurationSetName: "my-first-configuration-set",
				EmailTags: [{ Name: "origin", Value: "agcom_website_contact_form" }],
			},
		});
		return response?.messageId
			? { ok: true }
			: { ok: false, msg: "Failed to send email" };
	} catch (error: unknown) {
		console.log("ERROR", error);
		return { ok: false, msg: "Failed to send email" };
	}
};

type sendVisitorMessageProps = {
	adminEmail: string,
	userEmail: string,
	visitorName: string,
	visitorEmail: string,
	visitorMessage: string,
}