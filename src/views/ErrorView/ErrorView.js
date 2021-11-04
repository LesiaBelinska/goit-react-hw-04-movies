import PropTypes from 'prop-types';
//import s from './ErrorView.module.css';

export default function ErrorView({ message }) {
    return (
        <div>
            <p className='{s.message}'>Sorry, no matches found. Error:{message}</p>
        </div>
    );
}

ErrorView.propTypes = {
    message: PropTypes.string.isRequired,
};
