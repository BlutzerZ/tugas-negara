import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SuccessModal = ({ 
    isOpen, 
    onClose, 
    message, 
    buttonText = "OK", 
    autoClose = true,
    type = "success" // success, error, warning
}) => {
    useEffect(() => {
        if (isOpen && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, autoClose]);

    if (!isOpen) return null;

    const getIconByType = () => {
        switch (type) {
            case 'success':
                return (
                    <svg
                        className="h-6 w-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                );
            case 'error':
                return (
                    <svg
                        className="h-6 w-6 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                );
            case 'warning':
                return (
                    <svg
                        className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getBackgroundColorByType = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 dark:bg-green-900';
            case 'error':
                return 'bg-red-100 dark:bg-red-900';
            case 'warning':
                return 'bg-yellow-100 dark:bg-yellow-900';
            default:
                return 'bg-gray-100 dark:bg-gray-900';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <div 
                className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
                onClick={onClose}
            ></div>
            <div className="relative px-8 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full mx-4 transform transition-all duration-300 scale-100 opacity-100">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${getBackgroundColorByType()} animate-bounce`}>
                        {getIconByType()}
                    </div>

                    {/* Message */}
                    <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                        {message}
                    </div>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm transition-colors duration-200"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

SuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    autoClose: PropTypes.bool,
    type: PropTypes.oneOf(['success', 'error', 'warning'])
};

export default SuccessModal;
