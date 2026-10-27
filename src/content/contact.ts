import { services } from "@/content/services";

export const contact = {
  email: "enochjosiah10@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/0xjoebazz/" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/enoch-josiah-bazz10/",
    },
    { label: "Facebook", url: "https://web.facebook.com/joebazz100/" },
    { label: "X", url: "https://x.com/kokojoebass?s=11" },
    {
      label: "Threads",
      url: "https://www.threads.com/@joebazz_10?igshid=NTc4MTIwNjQ2YQ==",
    },
    {
      label: "Discord",
      url: "https://discord.com/users/1375695099849216010",
    },
  ],
  copy: {
    heading: "Let's talk about your project",
    intro: "Tell me what you'd like to build, and I'll reply to you by email.",
    directEmailLabel: "Prefer email?",
    submitLabel: "Send Message",
    successMessage:
      "Thanks, your message has been sent. I'll reply to the email address you provided.",
    errorMessage:
      "Something went wrong and your message was not sent. Please try again, or email me directly.",
  },
} as const;

export const serviceOptions = [
  ...services.map(({ title }) => title),
  "Something else",
] as const;
