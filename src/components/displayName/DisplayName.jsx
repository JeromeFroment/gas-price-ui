import React from 'react';
import PropTypes from 'prop-types';

export const DisplayName = (props) => {
    return(
        <>
            <p>
                <strong>{props.name}</strong>
            </p>
        </>
    );
};

DisplayName.propTypes = {
    name: PropTypes.string,
};

DisplayName.defaultProps = {
    name : ""
};