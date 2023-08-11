import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import CoursesIcon from '../CoursesIcon'

import './index.css'

class Home extends Component {
  state = {
    blogList: [],
    isSpine: true,
    failuer: false,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const url = `https://apis.ccbp.in/te/courses`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updateList = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({blogList: updateList, isSpine: false})
    } else {
      this.setState({failuer: true, isSpine: false})
    }
  }

  retryCLicked = () => {
    this.getBlogsData()
  }

  renderFailure = () => (
    <div className="failuer-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failuer-img"
      />
      <h1 className="failuer-heading">Oops! Something Went Wrong</h1>
      <p className="failuer-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryCLicked}
      >
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {blogList} = this.state
    return (
      <div>
        <h1 className="heading">Courses</h1>
        <ul className="courses-list">
          {blogList.map(each => (
            <CoursesIcon key={each.id} courseItemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderPage = () => {
    const {failuer} = this.state

    const page = failuer ? this.renderFailure() : this.renderSuccess()

    return page
  }

  render() {
    const {isSpine} = this.state

    return (
      <div className="app-container">
        <Header />
        <div className="button-container">
          {isSpine ? (
            <div data-testid="loader">
              <Loader type="threeDots" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            this.renderPage()
          )}
        </div>
      </div>
    )
  }
}

export default Home
