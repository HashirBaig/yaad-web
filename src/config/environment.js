const dev = {
  API_URL: "http://localhost:5000/api",
}
// API_URL: "https://meri-yaad.herokuapp.com/api",
const prod = {
  API_URL: "https://meri-yaad-core.herokuapp.com/api",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

export default config
