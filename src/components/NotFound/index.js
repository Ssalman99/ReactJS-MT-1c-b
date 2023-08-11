import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="app-container">
    <Header />
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="failuer-heading">Page Not Found</h1>
      <p className="failuer-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
