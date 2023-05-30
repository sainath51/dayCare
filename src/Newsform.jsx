import React, { useState } from 'react';

const Newsform = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
    });

    const [error, setError] = useState('');

    const handleChange = (props) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, author, content } = formData;

        if (!title || !author || !content) {
            setError('Please fill out all fields');
            return;
        }

        // Make API call to submit form data
        fetch('http://localhost:3001/news/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => setFormData(data))
        // Clear form data and error message on successful submission
        setFormData({ title: '', author: '', content: '' });
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title*</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author*</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="content">Content*</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Newsform;