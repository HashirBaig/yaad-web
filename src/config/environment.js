const dev = {
  API_URL: "http://localhost:5000/api",
}

const prod = {
  API_URL: "http://ec2-15-207-249-134.ap-south-1.compute.amazonaws.com:443/api",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

export default config
