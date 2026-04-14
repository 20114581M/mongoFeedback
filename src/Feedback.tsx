import React, { useState } from 'react'

function Feedback() {
    const [feedback, SetFeedback] = useState({
        studentName: "",
        course: "",
        rating: "",
        comment: ""

    })

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const AcquiredData = e.currentTarget;
        const { name, value } = AcquiredData;
        SetFeedback(
            (prev) => ({
                ...prev,
                [name]: value
            })
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentName: feedback.studentName,
                    course: feedback.course,
                    rating: feedback.rating,
                    comment: feedback.comment
                })
            });
            const data = await res.json();
            alert(data.message);
            SetFeedback({
                studentName: "",
                course: "",
                rating: "",
                comment: ""
            })
        } catch (err) {
            console.error(err);
            alert("Error Feedback submisstion")
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{ margin: "auto", width: "fit-content", padding: 10, display: "flex", flexDirection: "column", marginTop: "50px" }}>
                <label>Student Name: </label><br /><input required style={{ width: "450px", padding: "5px" }} type='Text' name='studentName' value={feedback.studentName} onChange={HandleChange} /><br />
                <label>Select Course: </label><br /><select required name="course" value={feedback.course} onChange={HandleChange} style={{ width: "462px", padding: "5px" }} >
                    <option value="">--Select Course--</option>
                    <option value="BSIT">BSIT</option>
                    <option value="CompEng">CompEng</option>
                </select><br />
                <label>Rating:</label><br />
                <label><input type='radio' name='rating' value="1" checked={feedback.rating === "1"} onChange={HandleChange} /> 1</label>
                <label><input type='radio' name='rating' value="2" checked={feedback.rating === "2"} onChange={HandleChange} /> 2</label>
                <label><input type='radio' name='rating' value="3" checked={feedback.rating === "3"} onChange={HandleChange} /> 3</label>
                <label><input type='radio' name='rating' value="4" checked={feedback.rating === "4"} onChange={HandleChange} /> 4</label>
                <label><input type='radio' name='rating' value="5" checked={feedback.rating === "5"} onChange={HandleChange} /> 5</label><br />
                <label>Comment:</label><br /><textarea required style={{ width: "450px", padding: "5px" }} name='comment' value={feedback.comment} onChange={HandleChange} />
                <button type='submit' style={{ marginTop: "20px", width: "100px", background: "#59cf59", border: "none", padding: "5px", color: "#FFFFFF" }} >submit</button>
            </form>
        </div>
    )
}

export default Feedback
