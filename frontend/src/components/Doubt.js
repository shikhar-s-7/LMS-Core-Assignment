import { useState, useRef, useEffect } from "react";
import Action from "../utils/Action"; 

const Doubt = ({ doubt, handleCreateDoubt, handleDeleteDoubt, handleEditDoubt }) => {
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [expand, setExpand] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editMode) {
            inputRef?.current?.focus();
        }
    }, [editMode]);

    const onAddReply = () => {
        handleCreateDoubt(input, doubt._id);
        setShowInput(false);
        setInput("");
    };

    const onSaveEdit = () => {
        handleEditDoubt(doubt._id, inputRef?.current?.innerText);
        setEditMode(false);
    };

    const onDelete = () => {
        handleDeleteDoubt(doubt._id);
    };

    const handleNewReply = () => {
        setShowInput(true);
        if(!expand) setExpand(true);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <div className="doubtContainer">
                <span contentEditable={editMode} suppressContentEditableWarning={editMode} ref={inputRef}>
                    {doubt.content}
                </span>

                <div style={{ display: "flex", marginTop: "5px" }}>
                    {editMode ? (
                        <>
                            <Action className="reply" type="SAVE" handleClick={onSaveEdit} />
                            <Action className="reply" type="CANCEL" handleClick={() => setEditMode(false)} />
                        </>
                    ) : (
                        <>
                            <Action className="reply" type="REPLY" handleClick={handleNewReply} />
                            <Action className="edit" type="EDIT" handleClick={() => setEditMode(true)} />
                            <Action className="delete" type="DELETE" handleClick={onDelete} />
                        </>
                    )}
                </div>
            </div>

            <div style={{ paddingLeft: 25, display: expand ? "block" : "none" }}>
                {showInput && (
                    <div className="inputContainer">
                        <input
                            type="text"
                            className="inputContainer__input"
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Action className="reply doubt" type="REPLY" handleClick={onAddReply} />
                        <Action className="reply" type="CANCEL" handleClick={() => setShowInput(false)} />
                    </div>
                )}
                {doubt.items?.map((reply) => (
                    <Doubt
                        key={reply._id}
                        doubt={reply}
                        handleCreateDoubt={handleCreateDoubt}
                        handleDeleteDoubt={handleDeleteDoubt}
                        handleEditDoubt={handleEditDoubt}
                    />
                ))}
            </div>
        </div>
    );
};

export default Doubt;
