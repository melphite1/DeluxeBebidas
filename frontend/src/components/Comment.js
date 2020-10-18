import React, {useState} from 'react';
import {connect} from 'react-redux'
import userActions from "../redux/actions/userActions"
import rubish from "../images/rubish.png"
import editComment from "../images/editComment.png"
import saveTik from "../images/saveTik.png"
import "../styles/comment.css"

const Comment = (props) => {
        const [editedComment, setEditedComment] = useState({
            comment: props.data.comment,
        })
        const [edit, setEdit] = useState(false)
       
        const [commentId, setDeleted] = useState(props.data._id)
    
        const erased = async () => {
            await props.deleteComment(commentId)
            props.fx(true)
        }
    
        const editing = () => {
            setEdit(!edit)
        }
    
        const readComment = e => {
            const text = e.target.value
    
            setEditedComment({
                ...editedComment,
                [e.target.name]: text,
                commentId: props.data._id,
            })
    
        }
        const sendEditedComment = async e => {
            e.preventDefault()
            await props.editComment(editedComment)
            props.fx(true)
            setEdit(false)
        }
        const options = () => {
            if (props.id === props.data.id) {
                return (
    
                    <>{edit 
                    ? <input type='text' onChange={readComment}className="CommentEditText" name="comment" style={{ background: "none"}} value={editedComment.comment}></input>
                     : <div className="heigtComment">
                          <p style={{ background: "none"}}> {props.data.comment}</p>
                       </div>
                     }
                        <div className="buttonEdit">
                            <button onClick={erased} className="buttonRubish" >
                                <img className="rubish" src={rubish}></img>
                            </button>
    
                            {edit
                            ? <button onClick={sendEditedComment} className="buttonRubish">
                                 <img className="edit" src={saveTik}></img>
                             </button>
    
                            :<button onClick={editing} className="buttonRubish">
                                <img className="edit" src={editComment}></img>
                             </button>
                            }		
                        </div>
                    </>
                )
            } else {
            return (
                    <>
                        <p style={{ backgroundColor: "none"}}>
                            {props.data.comment}
                        </p>
                    </>
                )
            }
        }
        
        return (
                <div className="allComentsDone">
                    <div>
                        <div className="titleEditComments" >
                                <p style={{fontWeight: "bold"}}>{props.data.name}  </p>
                            <div className="editComments">
                                {options()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
const mapStateToProps = state => {
    return{
    id: state.userReducer.id
    }
  }
const mapDispatchToProps = {
	editComment: userActions.editComment,
	deleteComment: userActions.deleteComment,
}
  
  export default connect(mapStateToProps,mapDispatchToProps) (Comment)