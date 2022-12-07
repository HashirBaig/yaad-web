const dev = {
  API_URL: "http://localhost:5000/api",
}

const prod = {
  API_URL: "http://ec2-54-64-48-118.ap-northeast-1.compute.amazonaws.com:80/api",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

export default config
