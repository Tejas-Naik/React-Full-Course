import React from 'react'

function RestartButton({ dispatch }) {
    return (
        <button
            className='btn btn-ui'
            onClick={() =>
                dispatch({ type: 'restart' })}
        >
            Restart Quiz
        </button>
    )
}

export default RestartButton