import React from "react"
const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody,periodtype,setperiodtype
}) => {
    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <label htmlFor="periodType">PeriodType:
                <select
                 value={periodtype}
                 onChange={(e)=>setperiodtype(e.target.value)}
                >
                    <option value="Monthly">Monthly</option>
                    <option value="Quaterly">Quaterly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
