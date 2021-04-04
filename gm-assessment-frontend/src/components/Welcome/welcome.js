import "./stylesheet/welcome.scss"

export default function Welcome() {
  return (
    <section className="welcome">
      <div className="welcome__playground">
        <div className="welcome__playground__div">
          <div className="welcome__playground__block pink"></div>
          <div className="welcome__playground__block blue"></div>
          <div className="welcome__playground__block yellow"></div>
          <div className="welcome__playground__block yellow-top"></div>
        </div>
      </div>
    </section>
  )
}