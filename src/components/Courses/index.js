import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import Course from '../Course'

import './index.css'

class Courses extends Component {
  state = {
    courseList: [],
    isLoading: true,
    failuer: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = [fetchedData.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({
        courseList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({failuer: true, isLoading: false})
    }
  }

  retryCLicked = () => {
    this.getData()
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
    const {courseList} = this.state

    return (
      <ul className="course-item-list-container">
        {courseList.map(each => (
          <Course key={each.id} courseItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderPage = () => {
    const {failuer} = this.state

    const page = failuer ? this.renderFailure() : this.renderSuccess()

    return page
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <Header />
        <div className="button-container">
          {isLoading ? (
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

export default Courses
