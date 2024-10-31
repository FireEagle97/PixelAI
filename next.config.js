// next.config.js
export const images = {
  domains: ["lh3.googleusercontent.com"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      port: "",
    },
  ],
};
