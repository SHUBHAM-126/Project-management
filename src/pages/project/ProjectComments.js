import { useState } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project }) {

    const [comment, setComment] = useState('')
    const { user, darkMode } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: comment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })

        if (!response.error) {
            setComment('')
        }
    }

    return (
        <div className={!darkMode ? 'project-comments' : 'project-comments darkmode'}>
            <h4>Project comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-author'>
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className='comment-date'>
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className='comment-content'>
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Add a comment</span>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} required></textarea>
                </label>
                <button className='btn'>Add comment</button>
            </form>
        </div>
    )
}