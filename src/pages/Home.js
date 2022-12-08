import Header from "../components/Header"
import Main from "../components/Main"
import Journal from "../components/Journal"

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Main>
        <Journal />
      </Main>
    </div>
  )
}

export default Home
