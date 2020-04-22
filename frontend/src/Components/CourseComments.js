import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class CourseComments extends React.Component {

  constructor() {
    super()
    this.state = {
      course: null,
      comment: '',
      user: null,
      errors: {}
    }
  }



  componentDidMount() {
    console.log(this.props.course)
    console.log(this.props.user)
    this.setState({ course: this.props.course, user: this.props.user })
  }

  handleSubmit(event) {
    event.preventDefault()
    const courseId = this.state.course.id
    axios.post(`/api/courses/${courseId}/coursecomments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ course: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }


  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })
  }


  render() {
    if (!this.state.course) return <h1>Waiting for comments</h1>

    const course = this.state.course

    return <>
      <div className="allCourseCommentsContainer">
        <h1 className="CourseCommentTitle">Add a comment for {course.name}</h1>
        <div className="allTheComments">
          {this.state.course.comments && this.state.course.comments.map((comment, index) => {
            return <article className="CommentContainer" key={index}>
              <div key={index} className="AComment">
                <div className="CommentsContent">
                  <p className="TheComment">{comment.comment}</p>
                </div>
              </div>
            </article>
          })}
        </div>
      </div>

      <div className="addCourseComment">
        <form onSubmit={() => this.handleSubmit(event)} >
          <textarea
            className="textarea"
            placeholder="Add comment...(max 200 characters)"
            onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>
          </textarea>
          <button className="button" id="commentSubmitButton">Submit</button>
        </form>
      </div>
    </>
  }

}

export default CourseComments