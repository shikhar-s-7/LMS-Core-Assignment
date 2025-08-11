import { useState } from "react";

const DoubtForm = ({ onPost }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() || isLoading) { //prevent submission if loading
            return;
        }

        setIsLoading(true);
        try {
            await onPost(content); 
            setContent('');
        } catch (error) {
            console.error("Failed to post doubt:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="create-doubt" onSubmit={handleSubmit}>
            <h3>Ask a Question</h3>
            <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Type your question here..."
                required
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Question'}
            </button>
        </form>
    );
};

export default DoubtForm;
