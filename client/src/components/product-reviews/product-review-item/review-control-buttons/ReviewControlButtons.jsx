import { Button } from 'react-bootstrap';

export default function ReviewControlButtons({ setIsEditing }) {
    const editHandler = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const deleteHandler = (e) => {
        e.stopPropagation();
        console.log('deleting');
    };

    return (
        <div className="buttons d-flex gap-1">
            <Button className="border btn-light rounded px-2 py-1 shadow" onClick={editHandler}>
                Edit
            </Button>
            <Button className="border btn-light rounded px-2 py-1 shadow" onClick={deleteHandler}>
                Delete
            </Button>
        </div>
    );
}
