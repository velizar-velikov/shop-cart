interface InputErrorMessageProps {
    text: string;
}

export default function InputErrorMessage({ text }: InputErrorMessageProps) {
    return <p id="input-error-message">{text}</p>;
}
