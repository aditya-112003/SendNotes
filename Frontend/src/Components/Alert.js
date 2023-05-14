import React, { useContext } from 'react'
import noteContext from '../Context/notes/notecontext';

function Alert() {
    const context = useContext(noteContext);
    const { alert } = context;

    return (
        <div style={{ height: '50px' }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.msg}
            </div>}
        </div>
    )
}

export default Alert