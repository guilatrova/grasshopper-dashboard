import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../duck';

const StateControl = ({ children, testId, onViewMode, onRunMode }) => {
    useEffect(() => {
        if (testId) {
            onViewMode(testId);
        }
        else {
            onRunMode();
        }
    }, [testId]);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => ({
    testId: ownProps.match.params.testId
});

const mapDispatchToProps = {
    onViewMode: actions.initAppViewMode,
    onRunMode: actions.initAppRunMode
};

export default connect(mapStateToProps, mapDispatchToProps)(StateControl);
