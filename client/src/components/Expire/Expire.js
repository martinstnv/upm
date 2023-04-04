import React from 'react';

const Expire = props => {

    const [isVisible, setIsVisible] = React.useState(true);
    const [children, setChildren] = React.useState(props.children)

    React.useEffect(() => {
        setChildren(props.children)
        setIsVisible(true)
        setTimer(props.delay);
    }, [props.children, props.delay]);


    const setTimer = (delay) => {
        setTimeout(() => setIsVisible(false), delay);
    };

    return isVisible
        ? <div>{children}</div>
        : <span />
}

export default Expire;