import React from 'react'
import styled from 'styled-components'

export default function Form({ onSubmit, name }) {
    return (
        <StyledForm action="" onSubmit={onSubmit} name={name}>
            <h2>Add</h2>
            <div>
                <input type="text" name='title' />
            </div>
            <div>
                <textarea name="description" id="" cols="30" rows="10"></textarea>
            </div>
            <button>Submit</button>
        </StyledForm>

    )
}

const StyledForm = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;

    & div{
        margin: 0.5rem 0;

        & input, textarea{
            padding: 0.5rem;
        }
    }

    & button{
        width: 200px;
        height: 30px;
    }
`