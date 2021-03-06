import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { decrementWordIndex, incrementWordIndex } from '../actions';
import Button from './Button';

const mapStateToProps = (state, ownProps) => {
    let text;
    switch (ownProps.type) {
        case 'DECREMENT_WORD': {
            text = 'prev';
            break;
        }
        case 'INCREMENT_WORD': {
            text = 'next';
            break;
        }
    }
    return { text };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let fn;
    switch (ownProps.type) {
        case 'DECREMENT_WORD': {
            fn = decrementWordIndex;
            break;
        }
        case 'INCREMENT_WORD': {
            fn = incrementWordIndex;
            break;
        }
    }
    return {
        onClick: () => {
            dispatch(fn());
        }
    }
};

const ChangeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);


export default ChangeButton;
