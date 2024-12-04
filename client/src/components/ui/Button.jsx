export function Button({ onClick, children }) {
    return (
        <button
            className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
            onClick={onClick}
        >
            {children}
        </button>
    );
}