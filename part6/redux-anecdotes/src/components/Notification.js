import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (notification === null) {
        return
    }

    return (
        <div style={style}>
            {notification}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)